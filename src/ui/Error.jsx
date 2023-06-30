import React from 'react'

const Error = ({ message }) => {
    return (
        <div className="border border-red-600 px-3 py-2 rounded-sm bg-red-200 mb-3">{message}</div>
    )
}

export default Error