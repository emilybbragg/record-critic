import React from "react";
import Album from "./Album";

function MyAlbumsPage({ user }) {

  return (
    <>
      <div className="my-reviews-heading">{user.username}'s Albums:</div>
        <ul className="my-albums-list">
          {user.albums?.length > 0 ? (user.albums.map((album) => (
            <>
              <div className="album-container">
                <Album 
                  key={album.id} 
                  id={album.id} 
                  album={album}
                  user={user}
                />
              </div>
            </>
              ))
            ) : 
            <div className="no-reviews">You haven't reviewed any albums yet!</div>
            }
          </ul>
    </>
  )
}

export default MyAlbumsPage;