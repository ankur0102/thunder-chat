import React from 'react';

const MessageBox = (props) => (
    <div className = "message-box">
        {props.messages}
    </div>
);

export default MessageBox;