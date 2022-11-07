import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FormField from "./styles/FormField.js";
import Input from "./styles/Input.js";
import Label from "./styles/Label.js";
import Button from "./styles/Button.js";
import Album from "./Album";
import FormError from "./styles/FormError.js";

function AlbumsPage() {
  const [albums, setAlbums] = useState([]);
  const [albumName, setAlbumName] = useState([]);
  const [albumArtist, setAlbumArtist] = useState([]);
  const [albumYear, setAlbumYear] = useState([]);
  const [albumImage, setAlbumImage] = useState([]);
  const [isLoadingAlbums, setIsLoadingAlbums] = useState(true);
  const [errors, setErrors] = useState([]);

  const [dataIndex, setDataIndex] = useState(0)
  const navigate = useNavigate();
  
  const navigateToReviews = (albumId) => {
    navigate(`/albums/${albumId}`);
  };

  function handleClickMore() {
    setDataIndex((dataIndex) => (dataIndex + 2) % albums.length);
  }
  function handleClickLess() {
    setDataIndex((dataIndex) => (dataIndex - 2) % albums.length);
  }  

  useEffect(() => {
    fetch("/albums")
      .then((r) => r.json())
      .then(albums => {
        if (albums) {
          setAlbums(albums)
        }
        else {
          setIsLoadingAlbums(false)
        }
      })
  }, [])

  useEffect(() => {
    if (albums.length > 0) {
      setIsLoadingAlbums(false)
    }
  }, [albums])

  function handleAlbumSubmit(e) {
    e.preventDefault();
    setErrors([]);
    const albumData = {
      name: albumName,
      artist: albumArtist,
      year: albumYear,
      image: albumImage,
    };
    fetch("/albums", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify(albumData),
    })
    .then((r) => {
    if (r.ok) {
      r.json().then((newAlbum) => {
        const allAlbumsWithNew = [...albums, newAlbum]
        setAlbums(allAlbumsWithNew);
        setAlbumName("");
        setAlbumArtist("");
        setAlbumYear("");
        setAlbumImage("");
      })
    } else {
      r.json().then((err) => {
        setErrors([err.error]);
      })
      }
    })
  }
  
  return (
    <Wrapper>
   { isLoadingAlbums ? <div>Loading Albums...</div> : 
   <>
    <button className="back-button" onClick={handleClickLess}><i class="gg-chevron-left"></i></button>
      <button className="next-button" onClick={handleClickMore}><i class="gg-chevron-right"></i></button>

      <h1 className="hometagline">Select an album to review:</h1>
      <div className="albumlist">
        { albums?.length > 0 ? ([...albums].slice(dataIndex, dataIndex + 2).map((album) => (
          <>
            <Album key={album.id} album={album}/>
            <Button className="seeReviewsButton" onClick={() => navigateToReviews(album.id)}>See Album Reviews</Button>
          </>
        ))
        ) : null}
      </div>
      <br></br>

      <form className="albumForm" onSubmit={handleAlbumSubmit}>
        <h1 className="formtagline">Or, add an album:</h1>

        <FormField>
          <Label htmlFor="nameInput">Album Name:</Label>
          <Input type="text" id="name" value={albumName} onChange={(e) => setAlbumName(e.target.value)}/>
        </FormField>

        <FormField>
          <Label htmlFor="artistInput">Album Artist:</Label>
          <Input type="text" id="artist" value={albumArtist} onChange={(e) => setAlbumArtist(e.target.value)}/>
        </FormField>

        <FormField>
          <Label htmlFor="yearInput">Album Release Year:</Label>
          <Input type="text" id="year" value={albumYear} onChange={(e) => setAlbumYear(e.target.value)}/>
        </FormField>

        <FormField>
          <Label htmlFor="imageInput">Album Cover:</Label>
          <Input type="url" id="image" value={albumImage} onChange={(e) => setAlbumImage(e.target.value)}/>
        </FormField>

        <FormField>
          <Button type="submit">Submit</Button>
        </FormField>

        <FormField>
          {errors.map((err) => (
            <FormError key={err}>{err}</FormError>
          ))}
        </FormField>
      </form>
    </>
      }

    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

export default AlbumsPage;