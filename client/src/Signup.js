import React, { useState } from 'react';


function Signup( { onLogin }) {
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
      password_confirmation: passwordConfirmation,
    }),
  }).then((r) => {
    if (r.ok) {
      r.json().then((user) => onLogin(user));
    } else {
      r.json().then((err) => setErrors(err.errors));
    }
  });
}

return (
  <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        autoComplete="off"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </div>
    <div>
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
      />
    </div>
    <div>
      <label htmlFor="password">Password Confirmation</label>
      <input
        type="password"
        id="password_confirmation"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        autoComplete="current-password"
      />
    </div>

    <button type="submit">Sign Up</button>

    <div>
      {errors.map((err) => (
        <label key={err}>{err}</label>
      ))}
    </div>

      </form>
  );
}

export default Signup;