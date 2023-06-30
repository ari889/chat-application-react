import React from 'react'
import { Link } from 'react-router-dom'

const ConversationList = ({ avatar, name, id, lastMessage, lastTime }) => {
    return (
        <li className="border-b last:border-b-0">
            <Link to={`/inbox/${id}`} className="flex flex-row justify-start items-center block py-2 px-3 transition delay-75 hover:bg-gray-200">
                <img src={avatar} className="rounded-full w-16 h-16" alt="" />
                <div className="ml-3 w-full">
                    <div className="flex flex-row justify-between items-center">
                        <h3 className="text-1xl font-semibold">{name}</h3>
                        <p>{lastTime}</p>
                    </div>
                    <p>{lastMessage}</p>
                </div>
            </Link>
        </li>
    )
}

export default ConversationList