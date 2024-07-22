import SummaryApi from "../Common";

const fetchCategorywiseProducts = async ({ category }) => {
  let response = await fetch(SummaryApi.get_catgwiseproducts.url, {
    method: SummaryApi.get_catgwiseproducts.method,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ category: category }),
  });

  response = await response.json();
  return response;
};

export default fetchCategorywiseProducts;
