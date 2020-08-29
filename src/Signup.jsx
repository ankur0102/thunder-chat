import React from 'react';

const Signup = (props) => (
    <div>
        <p><input id="signup-fullname" type = "text" placeholder = "Enter your Full Name" /></p>
        <p><input id="signup-username" type = "text" placeholder = "Enter a username" /></p>
        <p><input id="signup-password" type = "password" placeholder = "Enter a Password" /></p>
        <p><input id="signup-submit" type = "submit" onClick = {props.handleSignup} /></p>
    </div>
);

export default Signup;