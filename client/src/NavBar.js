import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function NavBar( { user, setUser }) {

  // function handleLogout() {
  //   fetch("/logout", {
  //     method: "DELETE",
  //   }).then(() => onLogout());
  // }

  function handleLogout() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
    
    <div className="navigation">
      <NavBar user={user} setUser={setUser} />
      <Navbar bg="light" variant="light" className="navBar">
        <div className="navContainer">
         <div className="title">Record Critic</div>
          <Nav className="navLinks">
          <Nav.Link as={NavLink} to="/albums">Albums</Nav.Link>
          <Nav.Link as={NavLink} to="/myalbums">My Albums</Nav.Link>
          <Nav.Link as={NavLink} to="/logout">Logout</Nav.Link>
         </Nav>
        </div>
        <header>
          <button onClick={handleLogout}>Logout</button>
        </header>
      </Navbar>
    </div>
  )
}

export default NavBar;