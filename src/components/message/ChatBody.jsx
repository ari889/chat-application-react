import React from 'react'
import ChatHead from './ChatHead'
import Messages from './Messages'
import Options from './Options'
import { useParams } from 'react-router-dom'
import { useGetMessagesQuery } from '../../features/messages/messagesApi'

const ChatBody = () => {
    /**
     * get conversation id from url parameter
     */
    const { id } = useParams();

    /**
     * get messages
     */
    const { data: messages, isLoading, isError, error } = useGetMessagesQuery(id);

    /**
     * decide what to render
     */
    let content = null;

    if (isLoading) {
        content = <div className="p-3 text-center">Loading...</div>
    } else if (!isLoading && isError) {
        <li className="p-3 text-center">
            <Error message={error} />
        </li>
    } else if (!isLoading && !isError && messages?.length === 0) {
        content = <div className="p-3 text-center">No messages to show</div>
    } else if (!isLoading && !isError && messages?.length > 0) {
        content = (
            <>
                <ChatHead message={messages[0]} />
                <Messages messages={messages} />
                <Options info={messages[0]} />
            </>
        );
    }

    return (
        <div className="p-3 w-3/4">
            {content}
        </div>
    )
}

export default ChatBody