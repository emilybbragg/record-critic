import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import SignupPage from "./SignupPage";
import LoginForm from "./LoginForm";
import Button from "./styles/Button.js";
import styled from "styled-components";

function LoginPage({ onLogin, user }) {
  const navigate = useNavigate()
  const [showLogin, setShowLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(true)


  console.log("USER FROM LOGIN PAGE")
  console.log(user)

  useEffect(() => {
    if (user) {
      navigate("/albums")
    } else {
      setIsLoading(false)
    }
  }, [user])
  

  return (
    <>
    {isLoading ? <div>Loading our user....</div> :
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
    </Wrapper>}
    </>
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