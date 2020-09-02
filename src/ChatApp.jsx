import React from 'react';
import { Component } from 'react';
import SideBar, { NewChatModal } from './SideBar';
import MessageBox from './MessageBox';
import { connect } from 'react-redux';
import { setToUser, setChatUsers, insertMessage } from './features/slice/chatAppSlice';
import { POST_MESSAGE, GET_MESSAGE, CHAT_USERS, WEB_SOCKET } from './applicationProperties';

class ChatApp extends Component {

    constructor(props) {

        super(props);
        this.onChatClick = this.onChatClick.bind(this);
        this.onEnter = this.onEnter.bind(this);
        this.updateState = this.updateState.bind(this);
        this.postMessage = this.postMessage.bind(this);
        this.processMessage = this.processMessage.bind(this);
        this.initializeWebSocket = this.initializeWebSocket.bind(this);
    }

    initializeWebSocket() {
        // initialize web socket here
        const socketPath = WEB_SOCKET + this.props.userName;
        
        this.ws = new WebSocket(socketPath);
        
        this.ws.onopen = () => {
            console.log('connected to web socket');
        }

        this.ws.onmessage = evt => {
            const message = JSON.parse (evt.data);
            
            console.log ('Message recieved in client.');
            console.log (message);
            if (message.fromUser === this.props.toUser) {

                this.updateState (message);
                console.log ('state message updated.');
            }
        }

        this.ws.onclose = () => {
            console.log ('disconnected to web socket');
        }
    }

    processMessage (data) {
        this.postMessage (data);
        this.updateState (data);
    }

    postMessage (data) {
        // handle message posting to websocket, current state and database
        const axios = require ('axios');
        this.ws.send (JSON.stringify(data));
        axios.post(POST_MESSAGE, data)
            .then (res => {
                console.log (res.data);
            })
            .catch (error => console.log('Error ', error));
    }

    updateState (data) {
        this.props.insertMessage(data);
    }

    onEnter(e) {

        console.log ('User is typing...');

        if (e.key === 'Enter') {

            const text = document.getElementById('message-text-box').value;

            const fromUser = this.props.userName;
            const toUser = this.props.toUser;

            if (toUser === '' || text === '') {

                document.getElementById('message-text-box').value = '';
                return null;
            }
            const data = { fromUser, toUser, text };

            this.processMessage(data);

            document.getElementById('message-text-box').value = '';
        }
    }

    onChatClick(toUser) {

        const fromUser = this.props.userName;
        const axios = require('axios');
        const data = { toUser, fromUser };
        axios.post (GET_MESSAGE, data)
            .then (res => {
                const messages = res.data;
                this.props.setToUser({ toUser, messages });
            })
            .catch(error => console.log('Error ', error));
    }

    componentDidMount() {

        const axios = require ('axios');

        const data = { userName: this.props.userName };

        this.initializeWebSocket();

        axios.post (CHAT_USERS, data)
            .then (res => {
                const chatUsers = res.data;
                this.props.setChatUsers ({chatUsers});
            })
            .catch (error => console.log ('Error ', error));
    }

    render() {
        return (
            <div id = 'chat-app'>
                <NewChatModal userName = { this.props.userName } />
                <SideBar userName = {this.props.userName} onChatClick = {this.onChatClick} />
                <MessageBox onEnter = {this.onEnter} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    toUser: state.chatApp.toUser,
});

const mapDispatchToProps = () => {
    return ({
        setToUser,
        setChatUsers,
        insertMessage,
    });
};

export default connect(mapStateToProps, mapDispatchToProps()) (ChatApp);
