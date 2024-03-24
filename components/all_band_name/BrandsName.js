import React, { useEffect, useState } from "react";
import { fetchCategories } from "../../services/CategoryServices";

const BrandsName = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories({
      paginate: "no",
    }).then((response) => {
      if (response?.data) {
        setCategories(response.data);
      }
    });
  }, []);

  return (
    <>
      <div className="marquee-cont">
        <div className="marquee-slider">
          {categories &&
            categories.map((category, key) => {
              return (
                <p className="prosto_one_regular text_style text-capitalize fw-bold">
                  {category.name}
                </p>
              );
            })}
        </div>
        <div className="marquee-slider">
          {categories &&
            categories.map((category, key) => {
              return (
                <p className="prosto_one_regular text_style text-capitalize fw-bold">
                  {category.name}
                </p>
              );
            })}
        </div>
        <div className="marquee-slider">
          {categories &&
            categories.map((category, key) => {
              return (
                <p className="prosto_one_regular text_style text-capitalize fw-bold">
                  {category.name}
                </p>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default BrandsName;
