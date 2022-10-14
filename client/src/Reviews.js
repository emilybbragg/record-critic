import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FormField from "./styles/FormField.js";
import Input from "./styles/Input.js";
import Label from "./styles/Label.js";
import Button from "./styles/Button.js";


function Reviews({ user }) {
  const [reviews, setReviews] = useState([]);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");
  const [reviewRating, setReviewRating] = useState("");
  // const albumId, setAlbumId = useState("")


  useEffect(() => {
    //get id params -- set id as state variable
    //  const albumIdFromParams = params[:id] // google how to get this from react-router-dom(?)
    // setAlbumId(albumIdFromparams)
    console.log("ALBUM REVIEWS PAGE")
    console.log(user)
    // fetch("/albums/${albumIdFromParams}")
    //   .then((r) => r.json())
    //   .then(reviews => setReviews(reviews))
  }, []);
 



  function handleReviewSubmit(e) {
    e.preventDefault();
    const reviewData = {
      title: reviewTitle,
      description: reviewDescription,
      rating: reviewRating,
      user_id: user.id,
      // album_id: albumId,
    };
    fetch("/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify(reviewData),
    })
      .then((r) => r.json())
      .then((newReview) => {
        const allReviewsWithNew = [...reviews, newReview]
        setReviews(allReviewsWithNew);
        setReviewTitle("");
        setReviewDescription("");
        setReviewRating("");
      })
  }


return (
  <Wrapper>
    
    <h1 className="reviewTagline">This album's reviews</h1>
    {reviews?.length > 0 ? (
      reviews.map((review) => (
        <Review key={review.id}>
          <ul className="reviewdisplayitem">
            <div className="reviewdisplay">
              {review.title} - {review.description} - {review.rating}
            </div>
          </ul>
       </Review >
    ))
  ) : (
    <>
      <h2>No Reviews Yet</h2>
    </>
    )}

    {/* <form className="reviewForm" onSubmit={handleReviewSubmit}>
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

    </form> */}



  </Wrapper>

)}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

const Review = styled.article`
  margin-bottom: 24px;
`;

export default Reviews;


// button on each album navigates to new page -- albums/id or albums/id/reviews -- nested
// display all the album information and render all reviews for that album
// add CRUD for creating new review


