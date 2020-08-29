import React from 'react';
import { Component } from 'react';
import Messages from './Messages';
import ChatBox from './ChatBox';
import MessageBox from './MessageBox';
import Welcome from './Welcome';
import { BrowserRouter } from 'react-router-dom';

//const URL = 'wss://6c3ce43b5086.ngrok.io'; // port is 3030
const URL = 'ws://localhost:3030/';

class Chat extends Component {
    
    constructor(props) {
    
        super(props);
        this.state = {
            message: [],
            userName: '',
            toUserName: '',
        }

        //this.ws = new WebSocket(URL);
        this.handleAccept = this.handleAccept.bind(this);
        this.processMessage = this.processMessage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.initializeSocket = this.initializeSocket.bind(this);
        this.postMessage = this.postMessage.bind(this);
    }

    initializeSocket (userName) {

        const socketURL = URL + userName;
        
        this.ws = new WebSocket(socketURL);

        this.ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected');
        }
      
        this.ws.onmessage = evt => {
            // on receiving a message, add it to the list of messages
            const message = JSON.parse(evt.data);
            this.updateState(message.text);
        }
      
        this.ws.onclose = () => {
            console.log('disconnected');
            // automatically try to reconnect on connection loss
            this.setState({
              ws: new WebSocket(socketURL),
            });
        }
    }

    processMessage(val) {

        this.postMessage(val); // make a post request
        this.updateState(val); //update the state
    }

    postMessage(val) {

        const axios = require('axios');

        const { userName, toUserName } = this.state;

        const data = {
            text : val,
            fromUser : userName,
            toUser: toUserName
        };

        this.ws.send(JSON.stringify(data));

        // make a post request to the backend
        //axios.post('https://eaccb35115a3.ngrok.io/postMessage', {text:val}) //port is 8080
        axios.post('http://localhost:8080/insertMessage', data)
        .then(res=>{
            console.log(res.data);
        })
        .catch(error=>{
            console.log('Error', error);
        });
    }


    updateState(val) {

        var { message } = this.state;

        const initialState = this.state;

        message.push(val);
        
        this.setState({
            ...initialState,
            message,
        });
    }


    handleAccept (e) {

        console.log ("Handle Accept Invoked.");

        if (e.key === 'Enter') {

            // send message to socket and update the state
            
            this.processMessage(e.target.value);

            document.getElementById('chat-input').value = '';
        }
            
    }

    handleSubmit (e) {

        console.log ("Submit button is clicked.");

        const axios = require('axios');

        const userName = document.getElementById ("login-input-username").value;
        const password = document.getElementById ("login-input-password").value;
        const toUserName = document.getElementById ("login-input-to").value;

        console.log("username is " + userName);
        console.log("password is " + password);

        const data = { userName: userName, password: password };
        axios.post("http://localhost:8080/authenticateUser", data)
            .then(res => {

                console.log(res);
                
                if(res.data.result === true) {

                    console.log ("Response received successfully");
                    
                    this.initializeSocket (userName);

                    const initialState = this.state;

                    this.setState({
                        ...initialState,
                        userName,
                        toUserName,
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleSignup() {

        const axios = require('axios');

        const userName = document.getElementById ("signup-username").value;
        const password = document.getElementById ("signup-password").value;
        const fullName = document.getElementById ("signup-fullname").value;
        const initialState = this.state;
        
        console.log ("Signing up");
        const data = {
            userName,
            password,
            fullName,
        };

        axios.post("http://localhost:8080/insertUser", data)
            .then( res => {
                console.log ("User inserted");
                console.log (res);

                this.initializeSocket (userName);
                
                this.setState({

                    ...initialState,
                    userName,
                    toUserName: "roadburner",
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        
        const { message } = this.state;
        const messages = message.map((entry, key)=><Messages message = {entry} key = {key}/>);
        
        const { userName } = this.state;
        var elem;
        if (userName !== '') {
            elem = (
                <div className = "container-flex">
                    <div className="container text-green border-thick-green border-round-50">
                        <MessageBox messages = {messages} />
                        <ChatBox accept = {this.handleAccept} />
                    </div>
                </div>
                ); 
        } else {
            elem = (
                <BrowserRouter>
                    <Welcome handleSubmit = {this.handleSubmit} handleSignup = {this.handleSignup} />
                </BrowserRouter>
            );
        }
        return elem;
    }
}

export default Chat;