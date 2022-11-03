import React, { useState } from 'react';
import './App.css';
import SignUp from './pages/signup';
import {
  Routes,
  Route,
  Link
} from 'react-router-dom'
import SignIn from './pages/SignIn';
import Chat from './pages/Chat';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/chat' element={<Chat />} />
      </Routes>
    </>
  );
}

export default App;
