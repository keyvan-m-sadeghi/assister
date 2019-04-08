import React, { useState, useReducer } from 'react';
import logo from './logo.svg';
import CommandHintBox from './components/CommandHintBox';
import MessagesList from './components/MessagesList';
import OptionsBox from './components/OptionsBox';
import MessageForm from './components/MessageForm';
import { messagesReducer } from './reducers';
import styles from './App.module.css';

export default function App(props) {
  const [messages, dispatch] = useReducer(messagesReducer, []);
  const [currentMessage, setMessage] = useState('');

  return (
    <div className="appContainer">
      <OptionsBox />
      <MessagesList messages={messages} />
      {/* <CommandHintBox message={currentMessage} /> */}
      <MessageForm
        message={currentMessage}
        messageSubmitHandler={() => {
          dispatch({
            type: 'addMessage',
            message: { content: currentMessage, type: 'conversation' }
          })
          dispatch({
            type: 'addMessage',
            message: { content: currentMessage, type: 'messageCard' }
          })
          setMessage('')
        }}
        messageChangeHandler={event => setMessage(event.target.value)}
      />
    </div>
  );
}
