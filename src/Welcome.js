import React from 'react';
import Login from './Login';
import Signup from './Signup';
import { Switch, Route, Link } from 'react-router-dom';

const Welcome = (props) => (
    <div>
        <Switch>
            <Route exact path = '/' render = {() => <Login { ...props } />}/>
            <Route path = '/signup' render = {() => <Signup { ...props } />}/>
        </Switch>
        <p>
        <Link to = "/signup"> Signup </Link> | <Link to = "/">Login</Link> 
        </p>
    </div>
);

export default Welcome;