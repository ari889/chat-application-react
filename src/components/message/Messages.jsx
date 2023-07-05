import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { messagesApi } from '../../features/messages/messagesApi';
import InfiniteScroll from 'react-infinite-scroll-component';

const Messages = ({ messages, totalCount, conversationId }) => {
    /**
     * get dispatch
     */
    const dispatch = useDispatch();
    /**
     * get loggedin user info
     */
    const { user } = useSelector(state => state.auth) || {};

    /**
     * get logged in user email
     */
    const { email } = user || {};

    /**
     * page state
     */
    const [page, setPage] = useState(1);

    /**
     * has more state
     */
    const [hasMore, setHasMore] = useState(true);

    /**
     * fetch more function
     */
    const fetchMore = () => {
        setPage(prevPage => prevPage + 1);
    }

    /**
     * get more data on page changes
     */
    useEffect(() => {
        if (page > 1) {
            dispatch(
                messagesApi.endpoints.getMoreMessages.initiate({ id: conversationId, receiverEmail: email, page })
            );
        }
    }, [page, email, conversationId, dispatch]);

    /**
     * set has more on return request
     */
    useEffect(() => {
        if (totalCount > 0) {
            const more = Math.ceil(totalCount / Number(import.meta.env.VITE_MESSAGES_PER_PAGE)) > page;
            setHasMore(more);
        }
    }, [totalCount, page]);

    return (
        <ul id="messageBody" className="border rounded-sm mt-3 h-[calc(100vh_-_238px)] flex flex-col-reverse">
            <InfiniteScroll
                dataLength={messages?.length}
                next={fetchMore}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                height={window.innerHeight - 238}
                style={{ display: "flex", flexDirection: "column-reverse" }}
                scrollableTarget="messageBody"
                inverse={true}
                className="p-3"
            >
                {messages.map((message) => {
                    const { message: lastMessage, id, sender } = message || {};
                    const isSender = sender.email === email;

                    return isSender ? (
                        <li key={id} className="my-3 table py-1 px-4 rounded-md max-w-lg bg-blue-500 text-white my-3 ml-auto">{lastMessage}</li>
                    ) : (
                        <li key={id} className="my-3 shadow-md table py-1 px-4 rounded-md text-left max-w-lg">{lastMessage}</li>
                    );
                })}
            </InfiniteScroll>
        </ul>
    )
}

export default Messages