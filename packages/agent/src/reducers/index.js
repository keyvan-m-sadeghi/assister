export function messagesReducer(messages, action){
    switch(action.type){
        case 'addMessage':
            if(!action.message.content.length)
                return messages
            let messagesClone = messages.slice(0)
            messagesClone.push(action.message)
            return messagesClone
        default:
            throw new Error()
    }
}