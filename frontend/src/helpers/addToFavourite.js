import { toast } from "react-toastify";
import SummaryApi from "../Common";

const addToFavourite = async (e, pid, vid) => {
  e.stopPropagation();
  e.preventDefault();

  const token = localStorage.getItem("token");
  let response = await fetch(SummaryApi.add_to_favourite.url, {
    method: SummaryApi.add_to_favourite.method,
    headers: {
      "content-type": "application/json",
      authorization: `${token}`,
    },
    body: JSON.stringify({ productId: pid, variantId: vid }),
  });
  response = await response.json();
  if (response.success) {
    // toast.success(response.message);
    // console.log(response.data);
    return response.data;
  } else {
    toast.error(response.message);
  }
};

export default addToFavourite;
