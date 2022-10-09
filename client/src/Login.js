import React, { useState } from 'react';
import Signup from "./Signup";
import LoginForm from "./LoginForm";
// import { Button } from "../styles";


function Login({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);


  return (
    <div className="login-form">
    <div>
      <h1>Record Critic</h1>
      <h2 className="tagline">A space for music lovers to come together</h2>
      {showLogin ? (
        <>
          <LoginForm onLogin={onLogin} />
          <br />
          <p className="newaccount">
            Don't have an account?</p>
            <button onClick={() => setShowLogin(false)}>
              Sign Up
            </button> 
        </>
      ) : (
        <>
          <Signup onLogin={onLogin} />
          <br />
          <p className="accountquestion">
            Already have an account?</p> &nbsp;
            <button onClick={() => setShowLogin(true)}>
              Log In
            </button>
            {/* <a href="http://localhost:3000/albums"></a> */}
        </>
      )}
    </div>
    </div>
  
  );
}

// const Wrapper = styled.section`
//   max-width: 500px;
//   margin: 40px auto;
//   padding: 16px;
// `;

export default Login;