import { toast } from "react-toastify";
import SummaryApi from "../Common";

const productRating = async (pid) => {
//   e.preventDefault();

  let response = await fetch(SummaryApi.product_rating.url, {
    method: SummaryApi.product_rating.method,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ productId: pid }),
  });
  response = await response.json();
  if (response?.success) {
    return response.data;
  } else {
    toast.error(response.message);
  }
};

export default productRating;
