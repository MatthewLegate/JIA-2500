import React from 'react';

import {BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';
import NewAccountPage from './pages/NewAccountPage';
import Register from './pages/Register';
import Reset from './pages/Reset';
import EventDisplayPage from './pages/EventDisplayPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='' element={<LoginPage/>} />           /* Default localhost:3000 link goes to login */
        <Route exact path='/login' element={<LoginPage/>} />
        <Route exact path='/user' element={<UserPage/>} >
          <Route path='/user/:eventName' element={<EventDisplayPage/>} />
        </Route>
        <Route exact path='/admin' element={<AdminPage/>} />
        <Route exact path='/create' element={<NewAccountPage/>} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/reset" element={<Reset />} />
      </Routes>
    </Router>
  )
}

export default App;
