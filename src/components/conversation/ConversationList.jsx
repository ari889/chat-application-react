import { Link } from 'react-router-dom'
import TrancatedString from '../../ui/TrancatedString'

const ConversationList = ({ avatar, name, id, lastMessage, lastTime }) => {
    return (
        <li className="border-b last:border-b-0">
            <Link to={`/inbox/${id}`} className="flex flex-row justify-start items-center block py-2 px-3 transition delay-75 hover:bg-gray-200">
                <img src={avatar} className="rounded-full w-10 h-10" alt="" />
                <div className="ml-3 w-full hidden md:inline">
                    <div className="flex flex-row justify-between items-center">
                        <h3 className="text-1xl font-semibold"><TrancatedString text={name} strLength={10} /></h3>
                        <p className="text-xs text-gray-400">{lastTime}</p>
                    </div>
                    <p><TrancatedString text={lastMessage} strLength={20} /></p>
                </div>
            </Link>
        </li>
    )
}

export default ConversationList