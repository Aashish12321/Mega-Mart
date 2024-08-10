import React from "react";

const Checkout = () => {
  return (
    <div className="w-full p-2 md:p-4 xl:px-12 text-white">
      <div className="text-2xl text-center">Product Checkout</div>

      <div className="flex w-full border p-1">
        <div className="w-full max-w-xl">
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="address" className="text-xl">
              Shipping Address
            </label>
            <textarea
              name="address"
              id="address"
              // value={review?.comment}
              // onChange={handleReviewChange}
              placeholder="Your address here..."
              className="w-full max-w-xl h-32 bg-zinc-800 outline-none p-1 rounded-xl resize-none"
            ></textarea>
            <div className="flex justify-between">
              <span className="text-xl">Contact Info</span>
              <div className="text-center my-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
