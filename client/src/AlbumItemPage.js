import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Album from './Album';

function AlbumItemPage() {

  const [currentAlbum, setCurrentAlbum] = useState("");

  const {albumId} = useParams();

  useEffect(() => {
      fetch(`/albums/${albumId}`)
        .then((r) => r.json())
        .then((a) => {
          setCurrentAlbum(a)
        });
  }, [albumId]);

  return (
    <div>
      <Album album={currentAlbum} showingYear />
    </div>
  )
}

export default AlbumItemPage;