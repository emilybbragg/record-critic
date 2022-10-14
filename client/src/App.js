import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import AlbumsPage from "./AlbumsPage";
import NavBar from "./NavBar";
import Reviews from "./Reviews";
import AlbumItemPage from "./AlbumItemPage";

function App() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null);
  // const [currentAlbum, setCurrentAlbum] = useState("")

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



          {/* // {user ? <Reviews /> : <Navigate to="/" />}/> */}
          {/* <Route path="/myreviews" element={<MyReviews />} /> */}
        </Routes>
    </div>
  );
}

export default App;