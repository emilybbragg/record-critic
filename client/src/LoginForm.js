import React, { useState } from 'react';
import Error from "./styles/Error.js"
import FormField from "./styles/FormField.js"
import Label from "./styles/Label.js"
import Input from "./styles/Input.js"
import Button from "./styles/Button.js"

function LoginForm ( { onLogin }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
      } else {
        r.json().then((err) => {
          setErrors([err.error])
        });
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
        <Input type="password" id="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      </FormField>

      <FormField>
        <Button>{isLoading ? "Loading..." : "Login"}</Button>
      </FormField>

      <FormField>
        {errors.map((err) => (
          <Error key={err}>{err}</Error>
        ))}
      </FormField>
    </form>
  );
}

export default LoginForm;