import React from 'react'
import GetInLineTitle from '../components/GetInLineTitle'
import { useNavigate } from 'react-router-dom';

import { doc, getDoc } from "firebase/firestore";
import { db } from '../Firebase';

export default function LoginPage() {
  let navigate = useNavigate();

  const docRef = doc(db, "users", "username");


  function userLoginButton() {
    var username = document.getElementById("usernameInput").value;
    var password = document.getElementById("passwordInput").value;

    navigate('/user');
  }

  return (
    <>
    <div>
      <GetInLineTitle/>
      Username <input type="text" id="usernameInput"/> <br/>
      Password <input type="password" id="passwordInput"/> <br/>
      
      <button onClick={() => userLoginButton()}>
          User Login
      </button>

      <button 
        onClick={() => {
          navigate('/admin');
          }} >
          Admin Login
      </button> 

      <button 
        onClick={() => {
          navigate('/create');
          }} >
          Create an Account
      </button> 
    </div>
    </>
  )
}
