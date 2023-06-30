import React from 'react'
import { useSelector } from 'react-redux'

const Messages = ({ messages }) => {
    /**
     * get loggedin user info
     */
    const { user } = useSelector(state => state.auth) || {};

    /**
     * get logged in user email
     */
    const { email } = user || {};

    return (
        <ul className="border rounded-sm p-3 mt-3 h-[calc(100vh_-_238px)] overflow-y-auto flex flex-col-reverse">
            {messages.slice().sort((a, b) => a.timestamp - b.timestamp).map((message) => {
                const { message: lastMessage, id, sender } = message || {};
                const isSender = sender.email === email;

                return isSender ? (
                    <li className="my-3 table py-1 px-4 rounded-md max-w-lg bg-blue-500 text-white my-3 ml-auto">{lastMessage}</li>
                ) : (
                    <li className="my-3 shadow-md table py-1 px-4 rounded-md text-left max-w-lg">{lastMessage}</li>
                );
            })}
        </ul>
    )
}

export default Messages