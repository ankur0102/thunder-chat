import React from 'react';

const Message = (props) => {

    const isUserSelf = props.userName === props.entry.fromUser;
    const userLabel = (isUserSelf === true) ? 'You' : props.entry.fromUser;
    const align = (isUserSelf === true) ? 'flex-end' : 'flex-start';

    return (
        <div className = "message-wrapper" style={{"alignItems": align}}>
            <div className = "message-container" style={{"alignItems": align}}>
                <div style={{"fontWeight": "bold"}}>{userLabel}:</div>
                <div>{props.entry.text}</div>
            </div>
        </div>
    );
}

export default Message;