import React, { useState, useEffect } from 'react';
import EditReview from "./EditReview";

function Review ( {handleReviewDeleteClick, review, handleUpdateReview, user} ) {

  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
    <div className="review-container">
      <ul className="reviewsList">
        <span className="review-title">{review?.title}</span>
        Rating: {review?.rating}/5
        <br></br>
        {review?.description}
        <p> - {review?.user?.username}</p>
      
       {isEditing && review.user_id == user.id ? (
        <EditReview
          id={review.id}
          review={review}
          setIsEditing={setIsEditing}
          handleUpdateReview={handleUpdateReview}
          user={user.id}
        />
   
       ) : review.user_id == user.id ? (
        <div className="review-buttons">
          <button className="editButton" onClick={() => setIsEditing((isEditing) => !isEditing)}>
            <span role="img" aria-label="edit">Edit ✏️</span>
          </button>
          <button className="deleteButton" onClick={() => handleReviewDeleteClick(review)}>
            <span role="img" aria-label="delete">Delete 🗑</span>
          </button>
        </div>
        )
        : null}

      </ul>
    </div>
    </>
  )
}

export default Review;