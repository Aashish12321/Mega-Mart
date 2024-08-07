import React from "react";
import StarRatings from "react-star-ratings";

const StarRating = ({ rating, dimension }) => {
  return (
    <div>
      <StarRatings
        rating={rating}
        starRatedColor="yellow"
        numberOfStars={5}
        starDimension={dimension}
        starSpacing="1px"
      />
    </div>
  );
};

export default StarRating;
