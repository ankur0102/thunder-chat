import React from 'react';

const Messages = (props) => (
    <div className = "message-container" style={{"padding-top": "10px"}}>
        <div style={{"font-weight": "bold"}}>You:</div>
        <div>{props.message}</div>
    </div>
);

export default Messages;