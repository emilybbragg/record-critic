import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import AlbumsPage from "./AlbumsPage";
import NavBar from "./NavBar";
import AlbumItemPage from "./AlbumItemPage";
import MyReviewsPage from "./MyReviewsPage";

function App() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true)

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          if (user) {
            setUser(user)
          } else {
            setIsLoadingUser(false)
          }
        });
      }
    });
  }, []);

  useEffect(() => {
    if (user) {
      console.log("USER")
      console.log(user)
      setIsLoadingUser(false)
    }
  }, [user])



  if (!user && !isLoadingUser) return <LoginPage user={user} onLogin={setUser} />

  return (
    <div>
     {isLoadingUser ?
      <div>Loading user data...</div>
      : 
      <>
        <NavBar user={user} setUser={setUser}/>
        <Routes>
          <Route path="/" element={<LoginPage user={user} onLogin={setUser} />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/albums" element={<AlbumsPage />} />
          <Route path="/albums/:albumId" element={<AlbumItemPage user={user}/>} />
          {/* <Route path="/albums/:albumId" element={user ? <AlbumItemPage user={user}/> : <Navigate to="/" />} /> */}
          <Route path="/myreviews" element={<MyReviewsPage user={user}/>} />
        </Routes>
      </>}
    </div>
  );
}

export default App;