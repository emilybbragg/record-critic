import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
// import Review from "./Review";
// import ReviewList from "./ReviewList";

function MyReviewsPage( {reviews, review, setReviews, user} ) {




  // const [userReviews, setUserReviews] = useState([]);
  // const {userId} = useParams();

  // useEffect(() => {
  //   fetch(`/reviews/${userId}`)
  //     .then((r) => r.json())
  //     .then((u) => {
  //       setUserReviews(u)
  //     });
  //   }, [userId])


  return (
<>
 

{/* {review.user_id == user.id ? (
<ul>
        <span className="review-title">{review?.title}</span>
        Rating: {review?.rating}/5
        <br></br>
        {review?.description}
        <p> - {review?.user?.username}</p>

</ul>

) : null} */}
<div className="my-reviews-heading">{user.username}'s Reviews:</div>

</>
    )
  
}


export default MyReviewsPage;