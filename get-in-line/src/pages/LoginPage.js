
import React, { useState, useEffect } from 'react';
import GetInLineTitle from '../components/GetInLineTitle';


import { doc, getDoc, query, collection, limit, getDocs } from "firebase/firestore";
import { db } from '../Firebase';

import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./login.css";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user)  {
        navigate("/admin");
      }
  }, [user, loading]);
  return (




    <div className="login">

      <div className="login__container">
        <div className="title">
        Get In Line
        </div>
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="login__btn"
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          <span>Login</span>
        </button>
        <button className="login__google" onClick={signInWithGoogle}>
          <span>Google</span>
        </button>
        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>

  );
}
export default Login;
