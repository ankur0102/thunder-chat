import React from 'react';

const ChatBox = (props) => (
    <div className= "chat-box">
        <input id="chat-input" type = "text" placeholder = "Type a Message" onKeyDown = {props.accept} />
    </div>
);

export default ChatBox;