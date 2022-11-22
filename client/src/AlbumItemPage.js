import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Album from './Album';
import ReviewList from './ReviewList';

function AlbumItemPage({ user, setUser }) {

  const [currentAlbum, setCurrentAlbum] = useState({ album_reviews: [] });
  const {albumId} = useParams();

  useEffect(() => {
    fetch(`/albums/${albumId}`)
      .then((r) => r.json())
      .then((a) => {
        setCurrentAlbum(a)
      });
    }, [albumId])

  return (
    <>
        <div className="album-container">
          <Album album={currentAlbum} />
        </div>
        <ReviewList 
          user={user} 
          setUser={setUser}
          albumId={albumId} 
          album={currentAlbum}
          setAlbum={setCurrentAlbum}
        />
    </>
  );
}

export default AlbumItemPage;