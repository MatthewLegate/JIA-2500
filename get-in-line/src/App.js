import React from 'react';

import {BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import LoginPage from './components/LoginPage';
import User from './User';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/login' element={<LoginPage/>} />
        <Route exact path='/user' element={<User/>} />
      </Routes>
    </Router>
  )
}

export default App;
