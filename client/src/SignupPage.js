import React, { useState } from 'react';
import SignupError from "./styles/SignupError.js";
import FormField from "./styles/FormField.js";
import Button from "./styles/Button.js";
import Input from "./styles/Input.js";
import Label from "./styles/Label.js";

function SignupPage( { onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);

 //POST request for creating a new user
 function handleSubmit(e) {
  e.preventDefault();
  setErrors([]);
  fetch("/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
      password_confirmation: passwordConfirmation
    }),
  }).then((r) => {
    if (r.ok) {
      r.json().then((user) => onLogin(user));
    } else {
      r.json().then((err) => {
        setErrors([err.error]);
      })
    }
  });
}

  return (
    <form onSubmit={handleSubmit}>
      <FormField>
        <Label htmlFor="username">Username</Label>
        <Input type="text" id="username" autoComplete="off" value={username} onChange={(e) => setUsername(e.target.value)}/>
      </FormField>

      <FormField>
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password"/>
      </FormField>

      <FormField>
        <Label htmlFor="password">Password Confirmation</Label>
        <Input type="password" id="password_confirmation" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} autoComplete="current-password"/>
      </FormField>
      
      <FormField>
        <Button type="submit">Sign Up</Button>
      </FormField>

      <FormField>
        {errors.map((err) => (
          <SignupError key={err}>{err}</SignupError>
        ))}
      </FormField>
    </form>
    
  );
}

export default SignupPage;