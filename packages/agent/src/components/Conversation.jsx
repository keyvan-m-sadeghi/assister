import React from 'react'

export default function Conversation({message}){
    return (<div className="conversation">{message.content}</div>)
}