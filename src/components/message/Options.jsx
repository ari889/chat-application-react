import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react';
import { useSelector } from 'react-redux'
import { useEditConversationMutation } from '../../features/conversations/conversationsApi';
import { useEffect } from 'react';

const Options = ({ info }) => {
    /**
     * message state
     */
    const [message, setMessage] = useState("");

    /**
     * get logged in user info
     */
    const { user: loggedInUser } = useSelector(state => state.auth);

    /**
     * edit conversation when sent message
     */
    const [editConversation, { isSuccess }] = useEditConversationMutation();

    /**
     * get participant user
     */
    const participantUser = info?.receiver?.email !== loggedInUser?.email ? info.receiver : info?.sender;

    /**
     * listen the message add success
     */
    useEffect(() => {
        if (isSuccess) {
            setMessage("");
        }
    }, [isSuccess]);

    /**
     * handle message sent
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        if (message !== '') {
            /**
             * send message
             */
            editConversation({
                id: info?.conversationId,
                sender: loggedInUser?.email,
                data: {
                    participants: `${loggedInUser.email}-${participantUser.email}`,
                    users: [loggedInUser._id, participantUser._id],
                    message,
                    timestamp: new Date().getTime()
                }
            });
        }
    }
    return (
        <form onSubmit={handleSubmit} className="relative mt-3">
            <input type="text" onChange={e => setMessage(e.target.value)} value={message} className="focus:outline-none border rounded-[3px] border-gray-300 px-3 py-1 w-full" />
            <button type="button">
                <FontAwesomeIcon icon={faPaperPlane} className="text-gray-300 absolute top-1/2 right-5 -translate-y-1/2" />
            </button>
        </form>
    )
}

export default Options