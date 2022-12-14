import React, { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

function NavBar({ user, setUser }) {
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate("/")
    }
  }, [])

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
        navigate("/")
      }
    });
  }

  return (
    <>
      <div className="nav-bar">
        <p className="welcome">Welcome, {user.username}!</p>
          <div className="links">
            <Link to="/albums" className="nav"> Albums </Link>
            <Link to="/myreviews" className="nav"> My Reviews </Link>
            <Link to="/myalbums" className="nav"> My Reviewed Albums </Link>
            <button onClick={handleLogoutClick} className="logout">Logout</button>
          </div>
      </div>
    </>
  )
}

export default NavBar;




