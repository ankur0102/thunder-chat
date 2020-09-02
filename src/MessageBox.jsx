import React from 'react';
import Message from './Message';
import { useSelector } from 'react-redux';

const MessageBox = (props) => {

    const messages = useSelector(state => state.chatApp.messages);
    const userName = useSelector(state => state.chatApp.userName);

    const messageComponent = messages.map((entry, key) => <Message userName = { userName } entry = { entry } key = { key } />);

    return (
        <div id = 'chat-box'>
            <div id = 'message-header' className = 'header'>
                <strong>Messages</strong>
            </div>
            <div id = 'message-box-user' className = 'message-container-info'>
                { messageComponent }
            </div>
            <div className = 'message-input'>
                <input id = "message-text-box" type = 'text' placeholder = 'Enter a message' onKeyDown = { props.onEnter } />
            </div>
        </div>
    );
}

export default MessageBox;
