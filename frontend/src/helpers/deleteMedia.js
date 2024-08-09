import { toast } from "react-toastify";
import SummaryApi from "../Common";

const deleteMedia = async (token, mediaUrl) => {
  // deleting from cloudinary
  let response = await fetch(SummaryApi.delete_media.url, {
    method: SummaryApi.delete_media.method,
    headers: {
      "content-type": "application/json",
      authorization: `${token}`,
    },
    body: JSON.stringify({ url: mediaUrl }),
  });
  response = await response.json();
  if (response.success) {
    // toast.success(response.message);
  } else {
    toast.error(response.message);
  }
};

export default deleteMedia;