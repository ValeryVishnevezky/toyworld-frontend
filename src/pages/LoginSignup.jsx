import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { login, signup } from "../store/actions/user.actions.js";
import { LoginForm } from "../cmps/LoginForm.jsx";

export function LoginSignup() {
  const navigate = useNavigate();
  const [isSignup, setIsSignUp] = useState(false);

  function onLogin(credentials) {
    isSignup ? _signup(credentials) : _login(credentials);
  }

  function _login(credentials) {
    login(credentials)
      .then(() => {
        showSuccessMsg("Logged in successfully");
        navigate("/toy")
      })
      .catch((err) => {
        showErrorMsg("Oops try again");
      });
  }

  function _signup(credentials) {
    signup(credentials)
      .then(() => {
        showSuccessMsg("Signed in successfully");
        navigate("/toy")
      })
      .catch((err) => {
        showErrorMsg("Oops try again");
      });
  }

  return (
    <div className="login-page">
      <button className="login-page-btn">
        <Link to="/toy">Back</Link>
      </button>
      <LoginForm onLogin={onLogin} isSignup={isSignup} />
      <div className="btns">
        <a className="login-page-signup-btn" href="#" onClick={() => setIsSignUp(!isSignup)}>
          {isSignup ? "Already a member? Login" : `New user? Signup here`}
        </a>
      </div>
    </div>
  );
}
