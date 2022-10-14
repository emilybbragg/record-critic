import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import FormField from "./styles/FormField.js";
import Input from "./styles/Input.js";
import Label from "./styles/Label.js";
import Button from "./styles/Button.js";
import Album from "./Album";


function AlbumsPage() {
  const [albums, setAlbums] = useState([]);
  const [albumName, setAlbumName] = useState([]);
  const [albumArtist, setAlbumArtist] = useState([]);
  const [albumYear, setAlbumYear] = useState([]);
  const [albumImage, setAlbumImage] = useState([]);

  const navigate = useNavigate();
  // const {albumId} = useParams();

  const navigateToReviews = (albumId) => {
    navigate(`/albums/${albumId}`);
  };

  useEffect(() => {
    fetch("/albums")
      .then((r) => r.json())
      .then(albums => setAlbums(albums))
  }, []);

  function handleAlbumSubmit(e) {
    e.preventDefault();
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
      .then((r) => r.json())
      .then((newAlbum) => {
        const allAlbumsWithNew = [...albums, newAlbum]
        setAlbums(allAlbumsWithNew);
        setAlbumName("");
        setAlbumArtist("");
        setAlbumYear("");
        setAlbumImage("");
      })
}

console.log(albums)

//POSSIBLE CODE FOR DISPLAYING # ALBUMS AT A TIME
  // const [dataIndex, setDataIndex] = useState(0)
  // // const [albumData, setAlbumData] = useState([]);

  // const albumItems = [...albums]
  //   .slice(dataIndex, dataIndex + 3)

  //   .map((album) => 
  //   <Albums 
  //     key={album.id}
  //     name={album.name}
  //     artist={album.artist}
  //   />
  // )


  // const allAlbums = albums.map((album) => {
  //   return <Album key={album.id} album={album}
  //   name={album.name} artist={album.artist} year={album.year} image={album.image}
  //   />
  // });


  return (
    <Wrapper>
    
      <h1 className="hometagline">Select an album to review:</h1>
      {albums?.length > 0 ? (albums.map((album) => (
        <>
         <Album key={album.id} album={album}/>
          {/* <a href={`/albums/${album.id}`}>See Album Reviews</a> */}
          <Button className="seeReviewsButton" onClick={() => navigateToReviews(album.id)}>See Album Reviews</Button>
        </>
        ))
      ) : (
        <>
          <h2>Or, add a new album: render form here?</h2>
        </>
      )}

      <form className="albumForm" onSubmit={handleAlbumSubmit}>

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

      </form>

    </Wrapper>

  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

// const Album = styled.article`
//   margin-bottom: 24px;
// `;

export default AlbumsPage;