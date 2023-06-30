import { faCirclePlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Search from "../components/conversation/Search"
import ConversationLists from "../components/conversation/ConversationLists"
import ChatBody from "../components/message/ChatBody"
import { useState } from "react"
import Modal from "../components/Modal"

const Index = () => {
    /**
     * modal state
     */
    const [show, setShow] = useState(false);

    /**
     * control modal
     */
    const toggle = () => {
        setShow(prevState => !prevState);
    }

    return (
        <div className="m-3 border-2 border-gray-300 flex flex-row justify-normal items-start">
            <div className="p-3 w-1/4">
                <Search />
                <ConversationLists />
                <button type="button" className="text-blue-600 text-2xl mt-3 ml-auto table" onClick={toggle}><FontAwesomeIcon icon={faCirclePlus} /></button>
                <Modal open={show} control={toggle} />
            </div>
            <ChatBody />
        </div>
    )
}

export default Index