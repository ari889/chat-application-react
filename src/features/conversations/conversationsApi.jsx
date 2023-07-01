import { apiSlice } from "../api/apiSlice";
import { messagesApi } from "../messages/messagesApi";

export const conversationsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getConversations: builder.query({
            query: (email) => `/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=1&_limit=${import.meta.env.VITE_CONVERSATIONS_PER_PAGE}`
        }),
        getConversation: builder.query({
            query: ({ userEmail, participantEmail }) => `/conversations?participant_like=${userEmail}-${participantEmail}&&participant_like=${participantEmail}-${userEmail}`
        }),
        addConversation: builder.mutation({
            query: ({ sender, data }) => ({
                url: "/conversations",
                method: "POST",
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const conversation = await queryFulfilled;

                if (conversation?.data?.id) {
                    /**
                     * silent entry to the message table
                     */
                    const users = arg.data.users;
                    const senderUser = users.find((user) => user.email === arg.sender); // sender info
                    const receiverUser = users.find(user => user.email !== arg.sender); // receiver info

                    dispatch(
                        messagesApi.endpoints.addMessage.initiate({
                            conversationId: conversation?.data?.id,
                            sender: senderUser,
                            receiver: receiverUser,
                            message: arg.data.message,
                            timestamp: arg.data.timestamp
                        })
                    )
                }
            }
        }),
        editConversation: builder.mutation({
            query: ({ id, data, sender }) => ({
                url: `/conversations/${id}`,
                method: "PAATCH",
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const conversation = await queryFulfilled;

                if (conversation?.data?.id) {
                    /**
                     * silent entry to the message table
                     */
                    const users = arg.data.users;
                    const senderUser = users.find((user) => user.email === arg.sender); // sender info
                    const receiverUser = users.find(user => user.email !== arg.sender); // receiver info

                    dispatch(
                        messagesApi.endpoints.addMessage.initiate({
                            conversationId: conversation?.data?.id,
                            sender: senderUser,
                            receiver: receiverUser,
                            message: arg.data.message,
                            timestamp: arg.data.timestamp
                        })
                    )
                }
            }
        })
    })
});

export const { useGetConversationsQuery, useGetConversationQuery, useAddConversationMutation, useEditConversationMutation } = conversationsApi;