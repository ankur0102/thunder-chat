import React from 'react';
import { INSERT_USER } from './applicationProperties';

const userSignUp = (onSubmitForm) => {

    const axios = require('axios');

    const fullName = document.getElementById ('signup-fullname').value;
    const userName = document.getElementById ('signup-username').value;
    const password = document.getElementById ('signup-password').value;

    const data = { fullName, userName, password };

    axios.post (INSERT_USER, data)
        .then (res => {
            
            const validUserName = document.getElementById ('signup-username').value;
            
            document.getElementById ('signup-fullname').value = '';
            document.getElementById ('signup-username').value = '';
            document.getElementById ('signup-password').value = '';

            onSubmitForm (validUserName);
        })
        .catch (error => console.log ('Error ', error));
}

const Signup = (props) => (
    <div>
        <p><input id="signup-fullname" type = "text" placeholder = "Enter your Full Name" /></p>
        <p><input id="signup-username" type = "text" placeholder = "Enter a username" /></p>
        <p><input id="signup-password" type = "password" placeholder = "Enter a Password" /></p>
        <p><input id="signup-submit" type = "submit" onClick = { () => userSignUp(props.onSubmitForm) } /></p>
    </div>
);

export default Signup;
