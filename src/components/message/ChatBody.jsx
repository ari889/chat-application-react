import ChatHead from './ChatHead'
import Messages from './Messages'
import Options from './Options'
import { useParams } from 'react-router-dom'
import { useGetMessagesQuery } from '../../features/messages/messagesApi'
import { useSelector } from 'react-redux'
import Error from '../../ui/Error'

const ChatBody = () => {
    /**
     * get conversation id from url parameter
     */
    const { id } = useParams();

    /**
     * get current user
     */
    const { user: loggedInUser } = useSelector(state => state.auth);

    /**
     * get logged in user email
     */
    const { email: receiverEmail } = loggedInUser || {};

    /**
     * get messages
     */
    const { data, isLoading, isError, error } = useGetMessagesQuery({ id, receiverEmail });

    /**
     * get messages and total count
     */
    const { data: messages, totalCount } = data || {};

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
                <Messages messages={messages} totalCount={totalCount} conversationId={id} />
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