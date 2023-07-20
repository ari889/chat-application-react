import { apiSlice } from "../api/apiSlice";
import { messagesApi } from "../messages/messagesApi";
import io from 'socket.io-client'

export const conversationsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getConversations: builder.query({
            query: (email) => `/conversations?participants=${email}&start=0&limit=${import.meta.env.VITE_CONVERSATIONS_PER_PAGE}`,
            transformResponse: ({ conversations, totalCount }, meta) => {
                return {
                    data: conversations,
                    totalCount
                }
            },
            async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
                // create socket
                const socket = io(import.meta.env.VITE_SOCKET_HOST, {
                    reconnectionDelay: 1000,
                    reconnection: true,
                    reconnectionAttemps: 10,
                    transports: ["websocket"],
                    agent: false,
                    upgrade: false,
                    rejectUnauthorized: false,
                });

                try {
                    await cacheDataLoaded;
                    socket.on("conversation", (data) => {
                        /**
                         * am i receiver or not
                        */
                        const receiverEmail = data?.data?.users[1]?.email;

                        if (arg == receiverEmail) {
                            /**
                             * update conversation cache
                             */
                            updateCachedData(draft => {
                                const conversation = draft?.data?.find(c => c._id == data?.data?._id);

                                if (conversation?._id) { // update existing conversation
                                    conversation.message = data?.data?.message;
                                    conversation.timestamp = data?.data?.timestamp;
                                } else { // add new conversation
                                    draft?.data?.unshift(data?.data);
                                    if (draft?.data?.length > Number(import.meta.env.VITE_CONVERSATIONS_PER_PAGE)) {
                                        draft?.data?.pop();
                                    }
                                }
                            })
                        }
                    })
                } catch (error) { }

                await cacheEntryRemoved;
                socket.close();
            }
        }),
        getMoreConversations: builder.query({
            query: ({ email, start }) => `/conversations?participants=${email}&start=${start}&_limit=${import.meta.env.VITE_CONVERSATIONS_PER_PAGE}`,
            async onQueryStarted({ email }, { queryFulfilled, dispatch }) {
                try {
                    const conversations = await queryFulfilled;

                    if (conversations?.data?.conversations?.length > 0) {
                        // update conversation pessimistically start
                        dispatch(
                            apiSlice.util.updateQueryData(
                                "getConversations",
                                email,
                                (draft) => {
                                    return {
                                        data: [
                                            ...draft.data,
                                            ...conversations.data.conversations
                                        ],
                                        totalCount: Number(draft.totalCount)
                                    }
                                }
                            )
                        )
                        // update conversation pessimistically end
                    }
                } catch (error) { }
            }
        }),
        getConversation: builder.query({
            query: ({ userEmail, participantEmail }) => `/conversations?participants=${userEmail}-${participantEmail}&&participants=${participantEmail}-${userEmail}`
        }),
        addConversation: builder.mutation({
            query: ({ sender, data }) => ({
                url: "/conversations",
                method: "POST",
                body: data
            }),
            async onQueryStarted({ sender, data }, { queryFulfilled, dispatch }) {
                const conversation = await queryFulfilled;


                if (conversation?.data?._id) {
                    /**
                     * silent entry to the message table
                    */
                    const users = conversation?.data?.users;
                    const senderUser = users.find((user) => user.email === sender); // sender info
                    const receiverUser = users.find(user => user.email !== sender); // receiver info

                    dispatch(
                        messagesApi.endpoints.addMessage.initiate({
                            conversationId: conversation?.data?._id,
                            sender: senderUser._id,
                            receiver: receiverUser._id,
                            message: data.message,
                            timestamp: data.timestamp
                        })
                    );

                    dispatch(
                        apiSlice.util.updateQueryData(
                            "getConversations",
                            sender,
                            (draft) => {
                                draft?.data?.unshift(conversation?.data);
                                if (draft?.data?.length > Number(import.meta.env.VITE_CONVERSATIONS_PER_PAGE)) {
                                    draft?.data?.pop();
                                }
                            }
                        )
                    );

                }
            }
        }),
        editConversation: builder.mutation({
            query: ({ id, data, sender }) => ({
                url: `/conversations/${id}`,
                method: "PATCH",
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                // optimistic cache update start
                const pathResult = dispatch(
                    apiSlice.util.updateQueryData(
                        "getConversations",
                        arg.sender,
                        (draft) => {
                            /**
                             * find the conversation from draft state and update
                             */
                            const draftConversation = draft.data.find(c => c._id == arg.id);

                            if (draftConversation) {
                                draftConversation.message = arg.data.message;
                                draftConversation.timestamp = arg.data.timestamp;
                            }
                        }
                    )
                )
                // optimistic cache update end

                try {
                    const conversation = await queryFulfilled;

                    if (conversation?.data?._id) {
                        /**
                         * silent entry to the message table
                         */
                        const users = conversation?.data?.users;
                        const senderUser = users.find((user) => user.email === arg.sender); // sender info
                        const receiverUser = users.find(user => user.email !== arg.sender); // receiver info

                        const res = await dispatch(
                            messagesApi.endpoints.addMessage.initiate({
                                conversationId: conversation?.data?._id,
                                sender: senderUser._id,
                                receiver: receiverUser._id,
                                message: arg.data.message,
                                timestamp: arg.data.timestamp
                            })
                        ).unwrap();

                        /**
                         * message cache pessimistic update
                        */
                        dispatch(
                            apiSlice.util.updateQueryData(
                                "getMessages",
                                { id: res?.conversationId, receiverEmail: res?.sender?.email },
                                (draft) => {
                                    draft?.data?.unshift(res);
                                    if (draft?.data?.length > Number(import.meta.env.VITE_MESSAGES_PER_PAGE)) {
                                        draft?.data?.pop();
                                    }
                                }
                            )
                        );
                        // end update
                    }
                } catch (error) {
                    pathResult.undo();
                }
            }
        })
    })
});

export const { useGetConversationsQuery, useGetConversationQuery, useAddConversationMutation, useEditConversationMutation, useGetMoreConversationsQuery } = conversationsApi;