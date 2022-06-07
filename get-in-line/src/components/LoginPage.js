import React from 'react'
import GetInLineTitle from './GetInLineTitle'
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  let navigate = useNavigate();


  return (
    <>
    <div>
      <GetInLineTitle/>
      Username <input type="text" /> <br/>
      Password <input type="text" /> <br/>
      <button 
        onClick={() => {
          navigate('/user');
          }} >
          User Login
      </button>
      <button>Admin Login</button> 

    </div>
    </>
  )
}
