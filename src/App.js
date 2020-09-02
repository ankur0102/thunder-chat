import React, { useState } from 'react';
import ChatApp from './ChatApp';
import './App.css';
import Welcome from './Welcome';
import { BrowserRouter } from 'react-router-dom';


function App() {
  document.body.style.background = "#000000";

  const [userName, setUserName] = useState('');

  var element;

  if (userName === '') {
    element = (
      <div>
        <BrowserRouter>
          <Welcome onSubmitForm = {setUserName} />
        </BrowserRouter>
      </div>
    );
  } else {
    element = (
      <div>
        <ChatApp userName = {userName} />
    </div>
    );
  }

  return element;
}

export default App;
