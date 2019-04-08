import React from 'react'

export default function MessageCard({message}){
    return (<div className="messageCard">Echo: {message.content}</div>)
}