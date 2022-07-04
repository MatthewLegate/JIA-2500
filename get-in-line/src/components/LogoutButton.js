import React from 'react';
import { useNavigate } from 'react-router-dom';

import { signOut } from "firebase/auth";

import { auth } from '../Firebase';

function LogoutButton() {
    let navigate = useNavigate();

  return (
    <button onClick={() => {
        signOut(auth);
        navigate('/login');
        }}>Log Out
    </button> 
  )
}

export default LogoutButton
