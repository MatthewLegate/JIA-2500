import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
    let navigate = useNavigate();

  return (
    <button onClick={() => {
        navigate('/login');
        }}>Log Out
    </button> 
  )
}

export default LogoutButton
