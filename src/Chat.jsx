import React from 'react';
import { Component } from 'react';
import Messages from './Messages';
import ChatBox from './ChatBox';
import MessageBox from './MessageBox';

const URL = 'wss://6c3ce43b5086.ngrok.io'; // port is 3030

class Chat extends Component {
    
    constructor(props) {
    
        super(props);
        this.state = {
            message: [],
        }

        this.ws = new WebSocket(URL);
        this.handleAccept = this.handleAccept.bind(this);
        this.onPressEnter = this.onPressEnter.bind(this);
    }

    onPressEnter(val) {
        
        // make a post request
        this.handlePost(val);

        this.updateState(val);
    }

    updateState(val) {

        var { message } = this.state;

        message.push(val);
        this.setState({
            message,
        });
    }

    handlePost(val) {

        const axios = require('axios');

        axios.post('https://eaccb35115a3.ngrok.io/postMessage', {text:val}) //port is 8080
        .then(res=>{
            console.log(res.data);
        })
        .catch(error=>{
            console.log('Error', error);
        });
    }

    componentDidMount() {
        
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
            ws: new WebSocket(URL),
          });
        }
    }

    handleAccept (e) {

        console.log ("Handle Accept Invoked.");

        if (e.key === 'Enter') {
            
            const message = {text: e.target.value};

            // send message to socket and update the state
            this.ws.send(JSON.stringify(message));
            this.onPressEnter(message.text);

            document.getElementById('chat-input').value = '';
        }
            
    }

    render() {
        
        const { message } = this.state;
        const messages = message.map((entry, key)=><Messages message = {entry} key = {key}/>);
        
        return (
            <div className = "container-flex">
                <div className="container text-green border-thick-green border-round-50">
                    <MessageBox messages = {messages} />
                    <ChatBox accept = {this.handleAccept} />
                </div>
            </div>            
        );
    }
}

export default Chat;