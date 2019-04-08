import React from 'react'
import MessageCard from './MessageCard'
import Conversation from './Conversation'

export default function MessagesList({ messages }) {
    return (
        <div className="messagesListContainer">
            {messages.map(
                (message, idx) =>
                    message.type === 'conversation' ?
                        <Conversation message={message} key={idx}/> :
                        <MessageCard message={message} key={idx}/>)}
        </div>
    )
}