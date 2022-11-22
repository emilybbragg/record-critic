import React, {useEffect} from "react";
import Review from "./Review";
import Album from "./Album";

function MyReviewsPage({ user, setUser }) {

  function handleReviewDeleteClick(review) {
    fetch(`/reviews/${review.id}`, {
        method: "DELETE",
    })
    .then((r) => {
      if (r.ok) {
        deleteReview(review)
      }
    })
  }

  function deleteReview(deletedReview) {
    const updatedReviews = user.reviews.filter((review) => review.id !== deletedReview.id)
    setUser( {...user, reviews: [...user.reviews, updatedReviews]} )
  }

  function handleUpdateReview(updatedReview) {
    const editedReviews = user?.reviews?.map((review) => {
      if (review.id === updatedReview.id) {
        return updatedReview;
      } else {
        return review;
      }
    });
    setUser({ ...user, reviews: editedReviews })
  }

  return (
    <>
      <div className="my-reviews-heading">{user.username}'s Reviews:</div>
      <ul className="my-reviews-list">
      {user.reviews.length > 0 ? (user.reviews.map((review) => (
        <>
          <Review 
            key={review.id} 
            id={review.id} 
            review={review}
            handleReviewDeleteClick={handleReviewDeleteClick} 
            handleUpdateReview={handleUpdateReview} 
            user={user}
            backgroundWhite
          />
          <div className="album-container">
            <Album 
            key={review.album.id} 
            id={review.album.id} 
            album={review.album}
            user={user}
          />
          </div>
        </>
          ))
        ) : 
        <div className="no-reviews">No reviews yet!</div>
        }
      </ul>

    </>
  )
}

export default MyReviewsPage;