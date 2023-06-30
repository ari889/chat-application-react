import React from 'react'
import gravatarUrl from 'gravatar-url';
import { useSelector } from 'react-redux'

const ChatHead = ({ message }) => {
    const { user } = useSelector(state => state.auth) || {};
    const { email } = user || {};
    const { sender, receiver } = message || {};

    const partnerEmail = sender.email === email ? receiver.email : sender.email;
    const partnerName = sender.email === email ? receiver.name : sender.name;

    return (
        <div className="flex flex-row justify-start items-center">
            <img src={gravatarUrl(partnerEmail, {
                size: 80
            })} className="rounded-full w-16 h-16" alt={partnerName} />
            <div className="ml-3">
                <a href="#" className="text-blue-600 font-semibold transition delay-75 hover:underline">{partnerName}</a>
                <p>{partnerEmail}</p>
            </div>
        </div>
    )
}

export default ChatHead