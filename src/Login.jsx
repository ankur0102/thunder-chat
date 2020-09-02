import React from 'react';

import { AUTHENTICATE_USER } from './applicationProperties';

const authenticateUser = (onSubmitForm) => {

    console.log ("Submit button is clicked.");

    const axios = require('axios');

    const userName = document.getElementById ("login-input-username").value;
    const password = document.getElementById ("login-input-password").value;

    console.log("username is " + userName);
    console.log("password is " + password);

    const data = { userName: userName, password: password };

    axios.post(AUTHENTICATE_USER, data)
            .then(res => {

                console.log ("Response received successfully");
                console.log(res);
                
                if(res.data.result === true) {
                    console.log ("User name is valid");
                    const validUserName = document.getElementById ("login-input-username").value;
                    document.getElementById ("login-input-username").value = '';
                    onSubmitForm (validUserName);
                }
            })
            .catch(error => {
                console.log(error);
            });
}

const Login = (props) => (
    <div>
        <p><input id="login-input-username" type = "text" placeholder = "Enter username" /></p>
        <p><input id="login-input-password" type = "password" placeholder = "Enter password" /></p>
        <p><input id='login-input-submit' type='submit' onClick={ () => authenticateUser(props.onSubmitForm)} /></p>
    </div>
);

export default Login;
