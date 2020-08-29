import React from 'react';

const Messages = (props) => {

    const isUserSelf = props.userName === props.message.fromUser;
    const userLabel = (isUserSelf === true) ? 'You' : props.message.fromUser;
    const align = (isUserSelf === true) ? 'flex-end' : 'flex-start';

    return (
        <div className="message-container" style={{"paddingTop": "0px", "width": "100%", "alignItems": align}}>
            <div className = "message-container" style={{"paddingTop": "10px", "alignItems": align}}>
            <div style={{"fontWeight": "bold"}}>{userLabel}:</div>
            <div>{props.message.text}</div>
            </div>
        </div>
    );
}

export default Messages;