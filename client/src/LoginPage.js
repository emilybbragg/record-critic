import React, { useState } from 'react';
import SignupPage from "./SignupPage";
import LoginForm from "./LoginForm";
import Button from "./styles/Button.js";
import styled from "styled-components";

function LoginPage({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <Wrapper>
      <div className="login-form">
        <h1 className="title">Record Critic</h1>
        <h2 className="tagline">A space for music lovers to come together.</h2>
        <br/>
        {showLogin ? (
          <>
            <LoginForm onLogin={onLogin} />
            <Divider />
            <div className="signupButton">
              <p>Don't have an account?</p>
              <Button onClick={() => setShowLogin(false)}>Sign Up</Button> 
            </div>
          </>
        ) : (
          <>
            <SignupPage onLogin={onLogin} />
            <Divider />
            <div className="loginButton">
              <p>Already have an account?</p>
              <Button onClick={() => setShowLogin(true)}>Log In</Button>
            </div>
          </>
        )}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 500px;
  margin: 40px auto;
  padding: 16px;
`;

const Divider = styled.hr`
  border: none;
  border-bottom: 1px solid #ccc;
  margin: 16px 0;
`;

export default LoginPage;