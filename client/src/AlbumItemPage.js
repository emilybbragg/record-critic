import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Album from './Album';
import styled from "styled-components";
import FormField from "./styles/FormField.js";
import Input from "./styles/Input.js";
import Label from "./styles/Label.js";
import Button from "./styles/Button.js";

function AlbumItemPage( {user, onDeleteReview} ) {

  const [currentAlbum, setCurrentAlbum] = useState("");
  const [reviews, setReviews] = useState([]);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");
  const [reviewRating, setReviewRating] = useState("");
  
  const {albumId} = useParams();
  // const {reviewId} = useParams();

  useEffect(() => {
      fetch(`/albums/${albumId}`)
        .then((r) => r.json())
        .then((a) => {
          console.log(a)
          setCurrentAlbum(a)
        });
  }, [albumId]);

  useEffect(() => {
    fetch(`/albums/${albumId}/reviews`)
      .then((r) => r.json())
      .then((reviews) => {
        setReviews(reviews)
      });
  }, []);

  function handleReviewSubmit(e) {
    e.preventDefault();
    const reviewData = {
      title: reviewTitle,
      description: reviewDescription,
      rating: reviewRating,
      user_id: user.id,
      album_id: parseInt(albumId),
    };

    console.log("ReviewData")
    console.log(reviewData)
    fetch(`/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify(reviewData),
    })
      .then((r) => r.json())
      .then((newReview) => {
        console.log("New Review")
        console.log(newReview)
        const allReviewsWithNew = [...reviews, newReview]
        setReviews(allReviewsWithNew);
        setReviewTitle("");
        setReviewDescription("");
        setReviewRating("");
      })
  }

  function handleReviewDeleteClick(review) {
    console.log(review)
    fetch(`/reviews/${review.id}`, {
        method: "DELETE",
    })
    // .then((r) => r.json())
    .then((r) => {
      if (r.ok) {
        deleteReview(review)
      }
    })
  }
  
  function deleteReview(deletedReview) {
    const updatedReviews = reviews.filter((review) => review.id !== deletedReview.id)
    setReviews(updatedReviews)
  }

  // function handleReviewDeleteClick() {
  //   fetch(`/albums/${albumId}/reviews/${id}`, {
  //     method: "DELETE",
  //   }).then((r) => {
  //     if (r.ok) {
  //       onDeleteReview(id);
  //     }
  //   });
  // }



 

  

  const allReviews = reviews.map(review => {
    return (
        <ul className="allReviews" key={review.id}>
          <div className="reviewTitle">"{review.title}"</div>
          <div className="reviewDesciption">{review.description}</div>
          <div className="reviewRating">{review.rating}/5</div>
          {/* <div className="reviewRating">{review.user_id}</div> */}
          {/* <div className="user">{user.username}</div> */}
          <button className="deleteButton" onClick={() => handleReviewDeleteClick(review)}>Delete</button>
          {/* <button onClick={handleReviewDeleteClick}>Delete</button> */}
        </ul>
    )
  })



  return (
    <>
    <div className="float-container">
    <Album album={currentAlbum} showingYear />
    <Wrapper>
    <div className="rightColumn">
      <h1 className="reviewTagline">Reviews For This Album:</h1>
      <div className="reviewContainer">{allReviews}</div>
    </div>
    </Wrapper>

     <Wrapper>
    <div className="leftColumn">

      <form className="reviewForm" onSubmit={handleReviewSubmit}>
        <div className="writeReview">Or, write a review...</div>
        <FormField>
          <Label htmlFor="titleInput">Review Name:</Label>
          <Input type="text" id="title" value={reviewTitle} onChange={(e) => setReviewTitle(e.target.value)}/>
        </FormField>

        <FormField>
          <Label htmlFor="descInput">Review Description:</Label>
          <Input type="text" id="desc" value={reviewDescription} onChange={(e) => setReviewDescription(e.target.value)}/>
        </FormField>

        <FormField>
          <Label htmlFor="ratingInput">Rating:</Label>
          <Input type="text" id="rating" value={reviewRating} onChange={(e) => setReviewRating(e.target.value)}/>
        </FormField>

        <FormField>
          <Button type="submit">Submit</Button>
        </FormField>
      </form>
      </div>
     
   </Wrapper>
   </div>
    </>
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

export default AlbumItemPage;