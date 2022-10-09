import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
import Albums from "./Albums";
// import NavBar from "./NavBar";

function App() {
  const [user, setUser] = useState(null);

  //For keeping user logged in
  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        console.log(r)
        r.json().then((user) => setUser(user));
      }
    });

  }, []);

  if (!user) return <Login onLogin={setUser} />
  
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/albums">Albums</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/albums" element={<Albums />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;