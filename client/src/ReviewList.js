import React, { useState } from 'react';
import FormField from "./styles/FormField.js";
import Input from "./styles/Input.js";
import Label from "./styles/Label.js";
import styled from "styled-components";
import Button from "./styles/Button.js";
import Review from "./Review";

function ReviewList({ 
  user, 
  setUser, 
  album,
  setAlbum,
  albumId, 
  handleReviewDeleteClick, 
  handleUpdateReview
}) {

  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");
  const [reviewRating, setReviewRating] = useState("");
  const [errors, setErrors] = useState([]);

  function handleReviewSubmit(e) {
    e.preventDefault();
    const reviewData = {
      title: reviewTitle,
      description: reviewDescription,
      rating: reviewRating,
      user_id: user.id,
      album_id: parseInt(albumId),
    };
    fetch(`/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify(reviewData),
    })
    .then((r) => {
      if (r.ok) {
        r.json().then((newReview) => {
          setAlbum({ ...album, album_reviews: [...album.album_reviews, newReview] })
          const previouslyReviewedAlbum = user.albums.find(a => a.id === newReview.album_id)
          if (previouslyReviewedAlbum) {
            const userAlbums = user.albums.filter(a => a.id !== previouslyReviewedAlbum.id)
            const albumWithReview = { ...previouslyReviewedAlbum, album_reviews: [...previouslyReviewedAlbum.album_reviews, newReview] }
           
            setUser({ 
              ...user, 
              reviews: [...user.reviews, newReview], 
              albums: [...userAlbums, albumWithReview] 
            })
          }
          else {
            const albumWithReview = { ...album, album_reviews: [newReview] }
            setUser({ 
              ...user, 
              reviews: [...user.reviews, newReview], 
              albums: [...user.albums, albumWithReview] 
            })
          }
          setReviewTitle("");
          setReviewDescription("");
          setReviewRating("");
        })
      } else {
        r.json().then((err) => setErrors(err.errors))
      }
    })
  }

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
    const updatedReviews = album.album_reviews.filter((review) => review.id !== deletedReview.id)
    setAlbum({ ...album, album_reviews: updatedReviews })

    const updatedUserReviews = user.reviews.filter((review) => review.id !== deletedReview.id)
    const foundReviewForAlbum = updatedUserReviews?.find(review => review.album.id === deletedReview.album_id)

    if (!foundReviewForAlbum) {
      const newUserAlbums = user.albums.filter(a => a.id !== deletedReview.album_id)
      setUser({
        ...user,
        albums: newUserAlbums,
        reviews:  updatedUserReviews
      })
    }
  }

  function handleUpdateReview(updatedReview) {
    const editedReviews = album.album_reviews.map((review) => {
      if (review.id === updatedReview.id) {
        return updatedReview;
      } else {
        return review;
      }
    });
    setAlbum({ ...album, album_reviews: editedReviews })

    const editedUserReviews = user.reviews.map((review) => {
      if (review.id === updatedReview.id) {
        return updatedReview;
      } else {
        return review;
      }
    });
    setUser( {...user, reviews: editedUserReviews} )
  }

  return (
    <>
      <Wrapper>
      <div className="review-container">
        {album?.album_reviews?.length > 0 ? (album.album_reviews.map((review) => (
          <Review 
            key={review.id} 
            id={review.id} 
            review={review} 
            handleReviewDeleteClick={handleReviewDeleteClick} 
            handleUpdateReview={handleUpdateReview} 
            user={user}
          />
          ))
        ) : null}
      
          <form className="reviewForm" onSubmit={handleReviewSubmit}>
            <div className="writeReview">Leave a Review:</div>
            <br></br>
            <FormField>
              <Label htmlFor="titleInput">Title:</Label>
              <Input type="text" id="title" value={reviewTitle} onChange={(e) => setReviewTitle(e.target.value)}/>
            </FormField>

            <FormField>
              <Label htmlFor="descInput">Review:</Label>
              <Input type="text" id="desc" value={reviewDescription} onChange={(e) => setReviewDescription(e.target.value)}/>
            </FormField>

            <FormField>
              <Label htmlFor="ratingInput">Rating (Out of 5):</Label>
              <Input type="text" id="rating" value={reviewRating} onChange={(e) => setReviewRating(e.target.value)}/>
            </FormField>

            <FormField>
              <Button type="submit">Submit</Button>
            </FormField>

            <FormField>
              <div>
                {errors.map((err) => (
                  <ul key={err} className="error-list">Error: {err}</ul>
                ))}
              </div>
            </FormField>
          </form>
        </div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

export default ReviewList;