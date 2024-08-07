import React, { useCallback, useEffect, useState } from "react";
import StarRating from "./StarRating";
import SummaryApi from "../Common";

const ProductReviews = ({ productId, reviewMetrics }) => {
  const [reviews, setReviews] = useState([]);
  const [starCounts, setStarCounts] = useState({});

  const fetchProductReviews = useCallback(async () => {
    let response = await fetch(SummaryApi.read_reviews.url, {
      method: SummaryApi.read_reviews.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ productId: productId }),
    });
    response = await response.json();
    if (response?.success) {
      setReviews(response?.data?.reviews);
      setStarCounts(response?.data?.starCounts);
    }
  }, [productId]);

  useEffect(() => {
    fetchProductReviews();
  }, [fetchProductReviews]);

  return (
    <div>
      <div className="flex gap-4">
        <div className="w-full max-w-sm flex flex-col items-center border-2">
          <span className="text-4xl font-bold">{reviewMetrics?.avgRating}</span>
          <StarRating rating={reviewMetrics?.avgRating} dimension={"20px"} />
          <span>
            {reviewMetrics?.ratingCount} Ratings & {reviewMetrics?.commentCount}{" "}
            Reviews
          </span>
        </div>
        <div className="w-full flex flex-col border-2 p-1">
          {[5,4,3,2,1].map((element, index) => (
            <div key={index} className="flex items-center gap-4">
              <span>{element}</span>
              <div className="w-full max-w-xs h-1 bg-gray-400 rounded-full">
                <div className={`h-full rounded-l-full bg-red-500 w-[${(starCounts[element]/reviews?.length)*100}%]`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
