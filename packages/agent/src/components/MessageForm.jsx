import React from 'react'

export default function MessageForm({ message, messageChangeHandler, messageSubmitHandler }) {
    return (
        <div className="messageFormContainer">
            <form onSubmit={(event) => {
                event.preventDefault();
                messageSubmitHandler()
            }}>
                <input type="text" onChange={messageChangeHandler} value={message} />
                <button type="submit"><i className="fas fa-paper-plane"></i></button>
            </form>
        </div>
    )
}