import React, { useEffect, useState } from "react";
import AddStarRating from "../../Components/AddStarRating";
import { useNavigate, useParams } from "react-router-dom";
import SummaryApi from "../../Common";
import Spinner from "../../Components/Loaders/Spinner";
import DisplayFullImage from "../../Components/DisplayFullImage";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import UploadImgLoader from "../../Components/Loaders/UploadImgLoader";
import uploadMedia from "../../helpers/uploadMedia";
import deleteMedia from "../../helpers/deleteMedia";

const AddReview = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userImgLoader, setUserImgLoader] = useState(false);
  const maxImageCount = 6;
  const [userImgCount, setUserImgCount] = useState(0);
  const { pid, vid } = useParams();
  const [fullImage, setFullImage] = useState("");
  const [openFullImage, setOpenFullImage] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [review, setReview] = useState({
    productId: pid,
    rating: "",
    comment: "",
    images: [],
  });

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (userImgCount + files?.length > maxImageCount) {
      toast.error("Maximum of 6 images can be uploaded");
      e.target.value = null;
      return;
    }

    setUserImgCount(userImgCount + files?.length);
    setUserImgLoader(true);
    let images = [...review?.images];

    for (let i = 0; i < files?.length; i++) {
      let uploadMediaCloudinary = await uploadMedia(
        files[i],
        "megamart_reviews"
      );
      images = [...images, uploadMediaCloudinary.url];
    }
    setReview({ ...review, images });
    setUserImgLoader(false);
  };

  const handleImageDelete = async (imgIndex) => {
    let images = [...review?.images];
    let deletedMediaUrl = images.splice(imgIndex, 1);
    deletedMediaUrl = deletedMediaUrl[0];
    images = [...images];
    setReview({ ...review, images });

    // deleting from cloudinary
    await deleteMedia(token, deletedMediaUrl);
  };

  useEffect(() => {
    const fetchDetails = async () => {
      let response = await fetch(SummaryApi.productdetails.url, {
        method: SummaryApi.productdetails.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ pid: pid }),
      });
      response = await response.json();
      if (response.success) {
        setProduct(response?.data);
        setLoading(false);
      }
    };
    fetchDetails();
  }, [pid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!review?.rating) {
      toast.info("Please rate the product");
    } else {
      let response = await fetch(SummaryApi.add_new_review.url, {
        method: SummaryApi.add_new_review.method,
        headers: {
          "content-type": "application/json",
          authorization: `${token}`,
        },
        body: JSON.stringify(review),
      });
      response = await response.json();
      if (response.success) {
        toast.success(response.message);
        navigate(`/product/${pid}/${vid}`);
      } else {
        toast.error(response.message);
      }
    }
  };
  return (
    <div className="w-full text-white">
      {loading ? (
        <Spinner />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="w-full p-2 md:p-8 justify-around bg-stone-600"
        >
          <div className="text-xl text-center lg:text-2xl font-bold my-1">
            Add Review
          </div>
          <div className="w-full flex justify-center mt-4">
            <div className="flex flex-col w-full items-center max-w-sm gap-2">
              <div className="w-64 bg-zinc-800 mx-auto rounded-lg p-1">
                {product?.variants?.map(
                  (variant) =>
                    variant?._id === vid && (
                      <img
                        key={variant?._id}
                        src={variant?.images[0]}
                        alt="images.webp"
                        className="w-full h-64 object-contain"
                      />
                    )
                )}
              </div>
              <div className="flex flex-wrap text-center">{product?.name}</div>
              <div className="w-full flex flex-col items-center mt-8 my-1 gap-4">
                <span className="text-lg lg:text-xl font-semibold">
                  Rate the Product
                </span>
                <AddStarRating review={review} setReview={setReview} />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row w-full justify-center mt-8 gap-8">
            <div className="w-full p-4 flex flex-col gap-1 bg-stone-500 rounded-xl">
              <span className="text-lg lg:text-xl font-semibold">
                Please share your opinion
              </span>
              <textarea
                name="comment"
                id="comment"
                value={review?.comment}
                maxLength={200}
                onChange={handleReviewChange}
                placeholder="Your opinions here..."
                className="w-full h-52 bg-zinc-800 outline-none p-1 rounded-xl resize-none border-2 border-zinc-500"
              ></textarea>
              <div className="text-right">{200 - review?.comment?.length} characters remaining</div>
            </div>
            <div className="w-full p-2 flex flex-col gap-1 bg-stone-500 rounded-xl">
              <span className="text-lg lg:text-xl font-semibold">
                Upload photos or videos
              </span>
              <label
                htmlFor="images-upload"
                className="w-full max-w-2xl h-32 cursor-pointer text-center bg-zinc-800 rounded-lg"
              >
                <FaCloudUploadAlt className="text-2xl mx-auto mt-8" />
                <span>Upload images</span>
                <input
                  type="file"
                  name="image"
                  id="images-upload"
                  multiple="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
              <div>
                Note: Maximum of 6 images are allowed.
              </div>
              <div className="mt-1 flex flex-wrap gap-4">
                {userImgLoader ? (
                  <UploadImgLoader length={userImgCount} />
                ) : (
                  review?.images?.map((image, index) => (
                    <label
                      key={index}
                      htmlFor="images"
                      className="relative group w-16 h-16 bg-zinc-800 rounded-md cursor-pointer"
                    >
                      <img
                        src={image}
                        alt={`img-${index}`}
                        id="images"
                        name="images"
                        className="w-full h-full object-contain rounded-md cursor-pointer"
                        onClick={() => {
                          setOpenFullImage(true);
                          setFullImage(image);
                        }}
                      />
                      <div
                        onClick={() => handleImageDelete(index)}
                        className="hidden group-hover:block absolute -mt-3 -right-1 bg-red-500 rounded-full "
                      >
                        <MdDelete className="text-md p-0.5" />
                      </div>
                    </label>
                  ))
                )}
              </div>
            </div>
          </div>
          <div className="text-center m-4 md:m-6">
            <button
              type="submit"
              className="bg-red-500 w-36 h-8 rounded-2xl shadow-sm shadow-white active:shadow-none active:translate-y-0.5 transition-all"
            >
              Submit
            </button>
          </div>
        </form>
      )}
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

export default AddReview;
