import React, { useEffect, useState } from "react";
import Review from "./Review";
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
    {/* <Album 
      user = {user}
      /> */}
    {/* <ul className="my-reviews-list">
    {userReviews?.length > 0 ? (userReviews.map((review) => (
      <>
      <div className="album-review-container">
          <div className="album-column">
            <div className="album-review-display">{review?.album?.name}
              <br></br>
              {review?.album?.artist}
              <br></br>
              {review?.album?.year}
            </div>
            
            <img className="album-image" src={review?.album?.image}/>
            <div className="album-review-details-container">
              <Review 
                key={review.id} 
                id={review.id} 
                review={review} 
                handleReviewDeleteClick={handleReviewDeleteClick} 
                handleUpdateReview={handleUpdateReview} 
                user={user}
                backgroundWhite
              />
            </div>
          </div>
        </div>
      </>
        ))
      ) : 
      <div className="no-reviews">No reviews yet!</div>
      }
    </ul> */}

  </>
  )
}

export default MyAlbumsPage;