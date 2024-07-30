import SummaryApi from "../Common";

const viewFavourite = async (e) => {
  e.stopPropagation();
  e.preventDefault();

  const token = localStorage.getItem("token");
  let response = await fetch(SummaryApi.view_favourite.url, {
    method: SummaryApi.view_cart.method,
    headers: {
      "content-type": "application/json",
      authorization: `${token}`,
    },
  });
  response = await response.json();
  // if (response.success) {
  //   return response.data;
  // }
};

export default viewFavourite;
