import React from "react";

function Album( {album} ) {

  return (
    <>
      <ul className="albumdisplayitems">
        <img src={album.image} className="albumimage" alt="Album Cover"/>
        <div className="albumdisplay">{album.name} - {album.artist} - {album.year}</div>
      </ul>
    </>
  )
}

export default Album;