import React from "react";
import { Rating } from "react-simple-star-rating";

const AddStarRating = ({ review, setReview }) => {
  const handleRating = (rating) => {
    setReview({ ...review, rating });
  };

  return (
    <div>
      <Rating
        initialValue={review?.rating}
        onClick={handleRating}
        allowFraction={false}
        showTooltip={true}
        tooltipArray={["Terrible", "Bad", "Average", "Great", "Awesome"]}
        tooltipStyle={{ width: 100 }}
        transition={true}
        SVGstyle={{ display: "inline" }}
      />
    </div>
  );
};

export default AddStarRating;
