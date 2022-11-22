import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import AlbumsPage from "./AlbumsPage";
import NavBar from "./NavBar";
import AlbumItemPage from "./AlbumItemPage";
import MyReviewsPage from "./MyReviewsPage";
import MyAlbumsPage from "./MyAlbumsPage";

function App() {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    reviews: [],
    albums: []
  });

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
            setUser(user)
        });
      }
    });
  }, []);

  if (!user) return <LoginPage user={user} onLogin={setUser} />

  return (
    <div>
      : 
      <>
        <NavBar user={user} setUser={setUser}/>
        <Routes>
          <Route path="/" element={<LoginPage user={user} onLogin={setUser} />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/albums" element={<AlbumsPage />} />
          <Route path="/albums/:albumId" element={<AlbumItemPage user={user} setUser={setUser} />} />
          <Route path="/myreviews" element={<MyReviewsPage user={user} setUser={setUser}/>} />
          <Route path="/myalbums" element={<MyAlbumsPage user={user} />} />
        </Routes>
      </>
    </div>
  );
}

export default App;