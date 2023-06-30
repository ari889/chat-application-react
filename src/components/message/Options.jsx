import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Options = () => {
    return (
        <form action="" className="relative mt-3">
            <input type="text" className="focus:outline-none border rounded-[3px] border-gray-300 px-3 py-1 w-full" />
            <FontAwesomeIcon icon={faPaperPlane} className="text-gray-300 absolute top-1/2 right-5 -translate-y-1/2" />
        </form>
    )
}

export default Options