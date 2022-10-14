import React from "react";

function Album({album, showingYear} ) {

  return (
    <>
      <ul className="albumdisplayitem">
        <img src={album.image} className="albumimage" alt="Album Cover"/>
        <div className="albumdisplay">{album.name} - {album.artist}</div>
      </ul>

      {showingYear ? 
        <div>{album?.year}</div>
        : null
      }

    </>
  )
}
export default Album;