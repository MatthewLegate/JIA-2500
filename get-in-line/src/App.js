import React from 'react';

import {BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AdminPage from './AdminPage';
import LoginPage from './components/LoginPage';
import User from './User';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='' element={<LoginPage/>} />           /* Default localhost:3000 link goes to login */
        <Route exact path='/login' element={<LoginPage/>} />
        <Route exact path='/user' element={<User/>} />
        <Route exact path='/admin' element={<AdminPage/>} />
      </Routes>
    </Router>
  )
}

export default App;
