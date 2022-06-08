import React from 'react';

import {BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='' element={<LoginPage/>} />           /* Default localhost:3000 link goes to login */
        <Route exact path='/login' element={<LoginPage/>} />
        <Route exact path='/user' element={<UserPage/>} />
        <Route exact path='/admin' element={<AdminPage/>} />
      </Routes>
    </Router>
  )
}

export default App;
