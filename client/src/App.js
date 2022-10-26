import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import AlbumsPage from "./AlbumsPage";
import NavBar from "./NavBar";
import AlbumItemPage from "./AlbumItemPage";
import MyReviewsPage from "./MyReviewsPage";
// import ReviewList from "./ReviewList";

function App() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null);

  //For keeping user logged in
  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/albums")
    }
  }, [user])

  if (!user) return <LoginPage onLogin={setUser} />

  return (
    <div>
      <NavBar user={user} setUser={setUser}/>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/albums" element={user ? <AlbumsPage /> : <Navigate to="/" />} />
          <Route path="/albums/:albumId" element={<AlbumItemPage user={user}/>} />
          {/* <Route path="/albums/:albumId" element={user ? <AlbumItemPage user={user}/> : <Navigate to="/" />} /> */}
          <Route path="/myreviews" element={<MyReviewsPage user={user}/>} />
        </Routes>
    </div>
  );
}

export default App;