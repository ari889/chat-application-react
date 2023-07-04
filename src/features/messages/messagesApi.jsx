import { apiSlice } from "../api/apiSlice";
import { io } from 'socket.io-client'

export const messagesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: ({ id, receiverEmail }) => `/messages?conversationId=${id}&_sort=timestamp&_order=desc&_page=1&_limit=${import.meta.env.VITE_MESSAGES_PER_PAGE}`,
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
                                draft.push(data?.data);
                            })
                        }
                    })
                } catch (error) { }

                await cacheEntryRemoved;
                socket.close();
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

export const { useGetMessagesQuery, useAddMessageMutation } = messagesApi;