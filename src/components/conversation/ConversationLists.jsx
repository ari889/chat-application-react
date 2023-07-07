import ConversationList from './ConversationList'
import { useSelector, useDispatch } from 'react-redux'
import { conversationsApi, useGetConversationsQuery } from '../../features/conversations/conversationsApi';
import Error from '../../ui/Error';
import getPartnerInfo from '../../utils/getPartnerInfo';
import gravatarUrl from 'gravatar-url';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState } from 'react';
import { useEffect } from 'react';

const ConversationLists = () => {
    /**
     * get dispatch hook
     */
    const dispatch = useDispatch();

    /**
     * get auth
     */
    const auth = useSelector(state => state.auth);

    /**
     * get email
     */
    const { email } = auth?.user || {};

    /**
     * start state
     */
    const [start, setStart] = useState(0);

    /**
     * has more data state
     */
    const [hasMore, setHasMore] = useState(true);

    /**
     * get conversations hook
     */
    const { data, isLoading, isError, error } = useGetConversationsQuery(email);

    /**
     * get conversations and total count
     */
    const { data: conversations, totalCount } = data || {};

    /**
     * fetch more page data
     */
    const fetchMore = () => {
        setStart(prevState => prevState + Number(import.meta.env.VITE_CONVERSATIONS_PER_PAGE))
    }

    /**
     * fetch more data when page change
     */
    useEffect(() => {
        if (start > 0 && start <= totalCount) {
            dispatch(
                conversationsApi.endpoints.getMoreConversations.initiate({
                    email, start
                })
            )
        }
    }, [start, email, dispatch, totalCount]);

    /**
     * set has more on total count change
     */
    useEffect(() => {
        if (totalCount > 0) {
            const more = conversations?.length < totalCount;
            setHasMore(more);
        }
    }, [totalCount, conversations]);


    /**
     * decide what to render
     */
    let content = null;

    if (isLoading) {
        content = <li className="m-2 text-center">Loading...</li>
    } else if (!isLoading && isError) {
        content = <li className="m-2 text-center">
            <Error message={error?.data} />
        </li>
    } else if (!isLoading && !isError && conversations?.length === 0) {
        content = <li className="m-2 text-center">No conversation found!</li>
    } else if (!isLoading && !isError && conversations?.length > 0) {
        content = <InfiniteScroll
            dataLength={conversations.length}
            next={fetchMore}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            height={window.innerHeight - 206}
        >
            {conversations.map(conversation => {
                const { _id, message, timestamp } = conversation;
                const { name, email: partnerEmail } = getPartnerInfo(conversation.users, email);

                return <ConversationList key={_id} id={_id} avatar={gravatarUrl(partnerEmail, {
                    size: 80
                })} name={name} lastMessage={message} lastTime={moment(timestamp).fromNow()} />
            })}
        </InfiniteScroll>;
    }

    return (
        <ul className="border mt-3 rounded h-[calc(100vh_-_206px)] overflow-hidden">
            {content}
        </ul>
    )
}

export default ConversationLists