import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
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
  const [userReviews, setUserReviews] = useState([])

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          if (user) {
            setUser(user)
          } 
          else {
            setIsLoadingUser(false)
          }
        });
      } else {
        setIsLoadingUser(false)
      }
    });
  }, []);

  useEffect(() => {
    if (user) {
      setIsLoadingUser(false)
      fetch (`/users/${user.id}/reviews`)
        .then((r) => r.json())
        .then((userReviews) => {
          setUserReviews(userReviews)
        })
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
          <Route path="/albums/:albumId" element={<AlbumItemPage user={user} />} />
          <Route path="/myreviews" element={<MyReviewsPage user={user} userReviews={userReviews} setUserReviews={setUserReviews} />} />
        </Routes>
      </>}
    </div>
  );
}

export default App;