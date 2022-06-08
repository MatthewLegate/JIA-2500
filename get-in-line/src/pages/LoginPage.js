import React from 'react'
import GetInLineTitle from '../components/GetInLineTitle'
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  let navigate = useNavigate();


  return (
    <>
    <div>
      <GetInLineTitle/>
      Username <input type="text" name="username"/> <br/>
      Password <input type="password" name="password"/> <br/>
      
      <button 
        onClick={() => {
          navigate('/user');
          }} >
          User Login
      </button>

      <button 
        onClick={() => {
          navigate('/admin');
          }} >
          Admin Login
      </button> 
    </div>
    </>
  )
}
