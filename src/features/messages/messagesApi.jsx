import { apiSlice } from "../api/apiSlice";
import { io } from 'socket.io-client'

export const messagesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: ({ id, receiverEmail }) => `/messages?conversationId=${id}&_sort=timestamp&_order=desc&_page=1&_limit=${import.meta.env.VITE_MESSAGES_PER_PAGE}`,
            transformResponse(apiResponse, meta) {
                const totalCount = meta.response.headers.get("X-Total-Count");
                return {
                    data: apiResponse,
                    totalCount
                }
            },
            async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
                // create socket
                const socket = io(import.meta.env.VITE_REACT_APP_API__URL, {
                    reconnectionDelay: 200,
                    reconnection: true,
                    reconnectionAttempts: 10,
                    transports: ["websocket"],
                    agent: false,
                    upgrade: false,
                    rejectUnauthorized: false
                });

                try {
                    await cacheDataLoaded;

                    socket.on("message", (data) => {
                        /**
                         * update conversation if I'm receiver
                         */
                        if (data?.data?.conversationId == arg.id && arg.receiverEmail == arg.receiverEmail) {
                            updateCachedData(draft => {
                                draft?.data?.unshift(data?.data);
                            })
                        }
                    })
                } catch (error) { }

                await cacheEntryRemoved;
                socket.close();
            }
        }),
        getMoreMessages: builder.query({
            query: ({ id, receiverEmail, page }) => `/messages?conversationId=${id}&_sort=timestamp&_order=desc&_page=${page}&_limit=${import.meta.env.VITE_MESSAGES_PER_PAGE}`,
            async onQueryStarted({ id, receiverEmail }, { queryFulfilled, dispatch }) {
                try {
                    const messages = await queryFulfilled;

                    if (messages?.data?.length > 0) {
                        dispatch(
                            apiSlice.util.updateQueryData(
                                "getMessages",
                                { id, receiverEmail },
                                (draft) => {
                                    return {
                                        data: [
                                            ...draft.data,
                                            ...messages.data
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