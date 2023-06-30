import React from 'react'
import ConversationList from './ConversationList'
import { useSelector } from 'react-redux'
import { useGetConversationsQuery } from '../../features/conversations/conversationsApi';
import Error from '../../ui/Error';
import getPartnerInfo from '../../utils/getPartnerInfo';
import gravatarUrl from 'gravatar-url';
import moment from 'moment';

const ConversationLists = () => {
    /**
     * get auth
     */
    const auth = useSelector(state => state.auth);

    /**
     * get email
     */
    const { email } = auth?.user || {};

    /**
     * get conversations hook
     */
    const { data: conversations, isLoading, isError, error } = useGetConversationsQuery(email);


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
        content = conversations.map(conversation => {
            const { id, message, timestamp } = conversation;
            const { name, email: partnerEmail } = getPartnerInfo(conversation.users, email);

            return <ConversationList key={id} id={id} avatar={gravatarUrl(partnerEmail, {
                size: 80
            })} name={name} lastMessage={message} lastTime={moment(timestamp).fromNow()} />
        });
    }

    return (
        <ul className="border mt-3 rounded h-[calc(100vh_-_206px)] overflow-y-auto">
            {content}
        </ul>
    )
}

export default ConversationLists