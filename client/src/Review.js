import React, { useState } from 'react';
import EditReview from "./EditReview";

function Review ( {handleReviewDeleteClick, review, handleUpdateReview, user} ) {

  const [updatedDescription, setUpdatedDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
    <div className="review-container">
      <ul className="reviewsList">
        <span className="review-title">{review?.title}</span>
        Rating: {review?.rating}/5
        <span>{review?.description}</span>
        <p> - {review?.user?.username}</p>
      
       {isEditing ? (
        <EditReview
          id={review.id}
          review={review}
          setIsEditing={setIsEditing}
          handleUpdateReview={handleUpdateReview}
        />
   
       ) : (
        <div className="review-buttons">
           <button className="editButton" onClick={() => setIsEditing((isEditing) => !isEditing)}>
            <span role="img" aria-label="edit">Edit ✏️</span>
          </button>
          <button className="deleteButton" onClick={() => handleReviewDeleteClick(review)}>
            <span role="img" aria-label="delete">Delete 🗑</span>
          </button>
    
         
        </div>
        )}
      </ul>
    </div>
    </>
  )
}

export default Review;