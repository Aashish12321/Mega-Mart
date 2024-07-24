import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SummaryApi from "../Common";
import Spinner from "../Components/Loaders/Spinner";

const ProductDetails = () => {
  const [product, setProduct] = useState("");
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { pid, vid } = params;
  // console.log(pid, vid);

  const fetchDetails = useCallback(async () => {
    let response = await fetch(SummaryApi.productdetails.url, {
      method: SummaryApi.productdetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ id: pid }),
    });

    response = await response.json();
    if (response.success) {
      setProduct(response.data);
      setLoading(false);
    }
  }, [pid]);

  // if (product) {
  //   console.log(product.variants);
  // }

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  return (
    <div className="h-[100vh] mx-auto py-1 md:p-6 text-white">
      {loading ? (
        <Spinner />
      ) : (
        <div className="md:flex">
          <div className="w-full ">
            {product.variants.map(
              (variant, vindex) =>
                variant._id === vid && (
                  <div className="flex w-full md:max-w-2xl justify-center gap-1">
                    <div className="flex w-full md:w-auto md:flex-col md:h-[538px] my-1 overflow-auto no-scrollbar">
                      {variant.images.map((image, imgindex) => (
                        <div className="w-full">
                          <div
                            key={imgindex}
                            className="hidden md:flex w-full max-w-32 mb-1 justify-center object-contain bg-zinc-800 border-2 border-transparent hover:border-red-500"
                          >
                            <img
                              src={image}
                              alt={"image " + imgindex}
                              className="h-32"
                            />
                          </div>
                          <div
                            key={imgindex}
                            className="md:hidden w-full bg-zinc-800 "
                          >
                            <img
                              src={image}
                              alt={"image " + imgindex}
                              className=""
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="hidden md:flex w-full max-w-[530px] items-center my-1 justify-center object-contain bg-zinc-800 border-2 border-transparent hover:border-red-500">
                      <img
                        src={variant.images[0]}
                        alt={"images 0.jpg"}
                        className="max-h-[530px]"
                      />
                    </div>
                  </div>
                )
            )}
          </div>
          <div>productdesc</div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
