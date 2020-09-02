import React from 'react';

const User = (props) => (
    <div className = 'user-info' onClick={ () => props.onChatClick(props.userChatName) }>
        { props.userChatName }
    </div>
);

export default User;
