import React from 'react';

const Login = (props) => (
    <div>
        <p><input id="login-input-username" type = "text" placeholder = "Type your username" /></p>
        <p><input id="login-input-password" type = "password" placeholder = "Password" /></p>
        <p><input id="login-input-to" type = "text" placeholder = "Enter the username of the user" /></p>
        <p><input id='login-input-submit' type='submit' onClick={props.handleSubmit} /></p>
    </div>
);

export default Login;