import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCategories from "../helpers/productCategories";

const CategoriesList = ({ categories }) => {
  const navigate = useNavigate();
  const [catg, setCatg] = useState("");
  const [subCatgs, setSubCatgs] = useState([]);

  const handleCategories = (category) => {
    navigate(`categories/${category}`);
  }

  useEffect(() => {
    if (catg) {
      const subCat =
        ProductCategories.find((category) => category.name === catg)
          ?.subcategories || [];
      setSubCatgs(subCat);
    }
  }, [catg]);

  return (
    <div className="flex">
      <table className="border-2  border-gray-900 flex">
        <tbody className="bg-white text-end">
          <tr className="bg-red-500 text-white text-center text-lg px-2">
            <th>Category</th>
          </tr>
          {categories.map((category, index) => (
            <tr
              key={index+category}
              onMouseEnter={() => setCatg(category)}
              onMouseLeave={() => setCatg("")}
              onClick={() => handleCategories(category)}
              className="hover:bg-gray-300 border-t-2 border-black cursor-pointer"
            >
              <td className="hover:font-semibold px-2">{category}</td>
            </tr>
          ))}
        </tbody>

        {catg && (
          <table className="border-l-2 left-0  border-black duration-500 ease-in-out">
            <thead className="bg-red-500 text-white text-center text-lg px-2">
              <th>More in {catg}</th>
            </thead>
            <tbody className="bg-white text-start">
              {subCatgs.map((subCatg, index) => (
                <tr
                  key={subCatg.id}
                  className="hover:bg-gray-300  cursor-pointer border-t-2 border-black"
                >
                  <td className="hover:font-semibold px-2">{subCatg.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </table>
    </div>
  );
};

export default CategoriesList;
