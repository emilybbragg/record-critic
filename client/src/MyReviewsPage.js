import React, { useEffect } from "react";
import Review from "./Review";

function MyReviewsPage({ user, userReviews, setUserReviews }) {

  useEffect(() => {
    if (user) {
      fetch (`/users/${user.id}/reviews`)
        .then((r) => r.json())
        .then((userReviews) => {
          setUserReviews(userReviews)
        })
    }
  }, [user])

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
    const updatedReviews = userReviews.filter((review) => review.id !== deletedReview.id)
    setUserReviews(updatedReviews)
  }

  function handleUpdateReview(updatedReview) {
    const editedReviews = userReviews.map((review) => {
      if (review.id === updatedReview.id) {
        return updatedReview;
      } else {
        return review;
      }
    });
    setUserReviews(editedReviews);
  }

  return (
    <>
      <div className="my-reviews-heading">{user.username}'s Reviews:</div>
      <ul className="my-reviews-list">
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
      </ul>

    </>
  )
}

export default MyReviewsPage;