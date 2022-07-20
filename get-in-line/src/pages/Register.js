import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../Firebase";
import "./register.css";

var adminStatus = true;

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(true);
  const navigate = useNavigate();

  const handleAdminChange = event => {
    setIsAdmin(event.target.checked);
    adminStatus = event.target.checked;
  };

  const register = () => {
    if (!name) alert("Please enter name");

    try {
      registerWithEmailAndPassword(name, email, password, adminStatus);
      navigate("/login");
    } catch (e) {
      console.log('Error')
    }

  };
  useEffect(() => {
    if (loading) return;
  }, [user, loading]);
  return (
    <div className="register">
      <div className="register__container">
        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input type="checkbox" id="admin" name="admin" onChange={handleAdminChange} checked={isAdmin} />
      <label for="admin">Admin</label>
        <button className="register__btn" onClick={register}>
          Register
        </button>
        <button
          className="register__btn register__google"
          onClick={signInWithGoogle}
        >
          Register with Google
        </button>
        <div>
          Already have an account? <Link to="/">Login</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Register;
