import React from 'react';
import User from './User';
import { useSelector } from 'react-redux';
import { INSERT_CHAT } from './applicationProperties';


const newChat = () => {
    console.log('New Chat');

    var modal = document.getElementById("myModal");

    // Get the button that opens the modal

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
}

const submitNewChat = (baseUser) => {

    console.log ("New Chat");

    const axios = require('axios');

    const friendUser = document.getElementById('input-new-chat').value;
    const data = { friendUser, baseUser };

    axios.post (INSERT_CHAT, data)
        .then (res => {
            console.log('Successful');
            
            var modal = document.getElementById("myModal");
            document.getElementById('input-new-chat').value = '';
            modal.style.display = "none";
        })
        .catch (error => {
            console.log (error);
            var modal = document.getElementById("myModal");
            document.getElementById('input-new-chat').value = '';
            modal.style.display = "none";
        });
}

export const NewChatModal = (props) => {
    return (
        <div id="myModal" className="modal">
            <div className="modal-content">
                <span className="close">&times;</span>
                <input id = 'input-new-chat' type = 'text' placeholder = 'Enter the User Name' />
                <input id = 'input-new-chat-submit' type='submit' onClick={ () => submitNewChat(props.userName) } />
            </div>
        </div>
    );
}

const SideBar = (props) => {

    const userChats = useSelector ( state => state.chatApp.chatUsers );
    const userChatComponent = userChats.map ((entry, key) => <User userChatName = { entry.userName } key={ key } onChatClick = { props.onChatClick }/>);

    return (
        <div id = 'side-bar'>
            <div id = 'sidebar-header-wrapper' className = 'header'>
                <div id = 'side-header'>
                    <strong>Chats</strong>
                </div>
                <div id = 'side-header-newchat' onClick = {newChat}>
                    +
                </div>
            </div>
            <div id = 'side-bar-user' className = 'bottom-container-info'>
                { userChatComponent }
            </div>
        </div>
    );
}

export default SideBar;
