import { apiSlice } from "../api/apiSlice";
import { io } from 'socket.io-client'

export const messagesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: ({ id, receiverEmail }) => `/messages/${id}?start=0&limit=${import.meta.env.VITE_MESSAGES_PER_PAGE}`,
            transformResponse({ messages, totalCount }, meta) {
                return {
                    data: messages,
                    totalCount
                }
            },
            async onCacheEntryAdded({ id, receiverEmail }, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
                // create socket
                const socket = io(import.meta.env.SOCKET_HOST, {
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

                    socket.on("message", (data) => {
                        /**
                         * update conversation if I'm receiver
                         */
                        if (data?.data?.conversationId == id && data?.data?.receiver?.email == receiverEmail) {
                            updateCachedData(draft => {
                                draft?.data?.unshift(data?.data);
                                if (draft?.data?.length > Number(import.meta.env.VITE_MESSAGES_PER_PAGE)) {
                                    draft?.data?.pop();
                                }
                            })
                        }
                    })
                } catch (error) { }

                await cacheEntryRemoved;
                socket.close();
            }
        }),
        getMoreMessages: builder.query({
            query: ({ id, receiverEmail, start }) => `/messages/${id}?start=${start}&limit=${import.meta.env.VITE_MESSAGES_PER_PAGE}`,
            async onQueryStarted({ id, receiverEmail }, { queryFulfilled, dispatch }) {
                try {
                    const messages = await queryFulfilled;

                    if (messages?.data?.messages?.length > 0) {
                        dispatch(
                            apiSlice.util.updateQueryData(
                                "getMessages",
                                { id, receiverEmail },
                                (draft) => {
                                    return {
                                        data: [
                                            ...draft.data,
                                            ...messages.data.messages
                                        ],
                                        totalCount: Number(draft.totalCount)
                                    }
                                }
                            )
                        )
                    }
                } catch (error) {

                }
            }
        }),
        addMessage: builder.mutation({
            query: (data) => ({
                url: "/messages",
                method: "POST",
                body: data
            })
        })
    })
});

export const { useGetMessagesQuery, useAddMessageMutation, useGetMoreMessagesQuery } = messagesApi;