import { apiSlice } from "../api/apiSlice";

export const conversationsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getConversations: builder.query({
            query: (email) => `/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=1&_limit=${import.meta.env.VITE_CONVERSATIONS_PER_PAGE}`
        }),
        getConversation: builder.query({
            query: ({ userEmail, participantEmail }) => `/conversations?participant_like=${userEmail}-${participantEmail}&&participant_like=${participantEmail}-${userEmail}`
        }),
        addConversation: builder.mutation({
            query: (data) => ({
                url: "/conversations",
                method: "POST",
                body: data
            })
        }),
        editConversation: builder.mutation({
            query: ({ id, data }) => ({
                url: `/conversations/${id}`,
                method: "PAATCH",
                body: data
            })
        })
    })
});

export const { useGetConversationsQuery, useGetConversationQuery, useAddConversationMutation, useEditConversationMutation } = conversationsApi;