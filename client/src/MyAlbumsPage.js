import React, { useEffect, useState } from "react";
import Album from "./Album";

function MyAlbumsPage( {user} ) {

  const [userAlbums, setUserAlbums] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(`/users/${user.id}/albums`).then((r) => {
        if(r.ok) {
          r.json().then((a) => setUserAlbums(a))
        }
      })
    }
  }, [user])

  return (
    <>
      <div className="my-reviews-heading">{user.username}'s Albums:</div>
        <ul className="my-albums-list">
          {userAlbums?.length > 0 ? (userAlbums.map((album) => (
            <>
              <div className="album-container">
                <Album 
                  key={album.id} 
                  id={album.id} 
                  album={album} 
                  name = {album.name}
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