import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import Review from "./Review";

function MyReviewsPage( {reviews, review, setReviews, user} ) {

  const [userReviews, setUserReviews] = useState([]);

  function displayUserReviews(user) {
    const userReviews = reviews.filter((review) => review.id !== user.id)
    setReviews(userReviews)
  }


  const {userId} = useParams();

  useEffect(() => {
    console.log(userReviews)
    fetch("/user/${userId}/reviews")
      .then((r) => r.json())
      .then(userReviews => setUserReviews(userReviews))
  }, [userId])



  //render all the albums and their corresponding reviews that the logged in user has left

  return (
    <div>
    <ul>
      {/* <Review
      userId={userId}
      userReviews={userReviews}
      displayUserReviews = {displayUserReviews}
      /> */}
    {/* {displayUserReviews} */}
    
    </ul>
      
    </div>
  )
}

export default MyReviewsPage;