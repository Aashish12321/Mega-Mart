import React from "react";
import StarRatings from "react-star-ratings";

const StarRating = ({ rating }) => {
  return (
    <div>
      <StarRatings
        rating={rating}
        starRatedColor="yellow"
        numberOfStars={5}
        starDimension="13px"
        starSpacing="1px"
      />
    </div>
  );
};

export default StarRating;
