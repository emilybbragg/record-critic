import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Album from './Album';
import ReviewList from './ReviewList';

function AlbumItemPage({ user }) {

  const [currentAlbum, setCurrentAlbum] = useState("");
  const {albumId} = useParams();
  const [reviews, setReviews] = useState([]);

  const handleGetReviews = () => {
    fetch(`/albums/${albumId}/reviews`)
    .then((r) => r.json())
    .then((reviews) => {
      setReviews(reviews)
    })
  }
  
  useEffect(() => {
    fetch(`/albums/${albumId}`)
      .then((r) => r.json())
      .then((a) => {
        setCurrentAlbum(a)
      });
      handleGetReviews();
    }, [albumId])

  return (
    <>
        <div className="album-container">
          <Album album={currentAlbum} />
        </div>
        <ReviewList 
          user={user} 
          albumId={albumId} 
          reviews={reviews}
          setReviews={setReviews}
        />
    </>
  );
}

export default AlbumItemPage;