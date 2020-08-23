import React from 'react';

const Messages = (props) => (
    <div className = "message-container" style={{"paddingTop": "10px"}}>
        <div style={{"fontWeight": "bold"}}>You:</div>
        <div>{props.message}</div>
    </div>
);

export default Messages;