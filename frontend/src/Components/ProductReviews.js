import React, { useCallback, useEffect, useState } from "react";
import StarRating from "./StarRating";
import SummaryApi from "../Common";
import { IoStarSharp } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { HiBadgeCheck } from "react-icons/hi";
import moment from "moment";
import DisplayFullImage from "./DisplayFullImage";

const ProductReviews = ({ product }) => {
  const [reviews, setReviews] = useState([]);
  const [starCounts, setStarCounts] = useState({});
  const [maxStarRatingCount, setMaxStarRatingCount] = useState({});
  const [loading, setLoading] = useState(true);
  const [fullImage, setFullImage] = useState("");
  const [openFullImage, setOpenFullImage] = useState(false);
  const barColor = {
    5: "bg-green-500",
    4: "bg-green-400",
    3: "bg-yellow-500",
    2: "bg-orange-400",
    1: "bg-red-500",
  };

  const commentDateFormat = (date) => {
    return moment(date).fromNow();
  };

  const fetchProductReviews = useCallback(async () => {
    let response = await fetch(SummaryApi.read_reviews.url, {
      method: SummaryApi.read_reviews.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ productId: product?._id }),
    });
    response = await response.json();
    if (response?.success) {
      setReviews(response?.data?.reviews);
      setStarCounts(response?.data?.starCounts);
      setMaxStarRatingCount(response?.data?.maxStarRatingCount);
      setLoading(false);
    }
  }, [product]);

  useEffect(() => {
    fetchProductReviews();
  }, [fetchProductReviews]);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-col md:flex-row gap-4">
        <div className="w-full max-w-xs flex flex-col items-center justify-center">
          <span className="text-4xl font-bold">{product?.ratings?.avgRating}</span>
          <StarRating rating={product?.ratings?.avgRating} dimension={"20px"} />
          <span>
            {product?.ratings?.ratingCount} Ratings & {product?.ratings?.commentCount}{" "}
            Reviews
          </span>
        </div>
        <div className="w-full flex flex-col justify-center p-1 ">
          {[5, 4, 3, 2, 1].map((star, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="flex items-center gap-1">
                {star} <IoStarSharp className="text-xs text-yellow-300" />
              </span>
              <div className="w-full max-w-xs h-1.5 bg-gray-600 rounded-full">
                <div
                  className={`h-full rounded-full ${
                    reviews?.length > 0 && barColor[star]
                  }`}
                  style={{
                    width: `${(starCounts[star] / maxStarRatingCount) * 100}%`,
                  }}
                >
                  {loading && (
                    <div className="h-full bg-slate-200 animate-pulse rounded-full"></div>
                  )}
                </div>
              </div>
              <span>{starCounts[star]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-0.5 bg-gray-500"></div>

      <div className="w-full">
        {reviews?.map((review) => (
          <div key={review?._id} className="w-full mt-4">
            <div className="flex p-1 gap-2">
              {review?.userId?.profilePic ? (
                <img
                  src={review?.userId?.profilePic}
                  alt="customer.jpg"
                  className="w-12 h-12 object-cover rounded-full"
                />
              ) : (
                <FaCircleUser className="w-12 h-12 text-gray-200" />
              )}

              <div className="w-full flex flex-col">
                <span className="flex items-center gap-1">
                  <span className="font-semibold">{review?.userId?.name}</span>
                  {review?.verified && (
                    <HiBadgeCheck className="text-gray-300" />
                  )}
                </span>
                <div className="flex justify-between items-center">
                  <StarRating rating={review?.rating} dimension={"15px"} />
                  <span className="text-sm">
                    {commentDateFormat(review?.createdAt)}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full px-2 py-1 line-clamp-3 text-balance font-Roboto">
              {review?.comment}
            </div>
            <div className="flex gap-2 mx-2">
              {review?.images?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`reviewimg${index}`}
                  className="w-16 h-16 object-contain bg-zinc-800 rounded-md cursor-pointer"
                  onClick={() => {
                    setOpenFullImage(true);
                    setFullImage(image);
                  }}
                />
              ))}
            </div>
            <div className="w-full border mt-4 border-gray-500"></div>
          </div>
        ))}
      </div>

      <div className="left-4">
        {openFullImage && (
          <DisplayFullImage
            imgUrl={fullImage}
            onClose={() => setOpenFullImage(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
