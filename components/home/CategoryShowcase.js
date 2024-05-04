import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
// import Slider from "react-slick";
import { fetchCategories } from "../../services/CategoryServices";
import { getStoragePath } from "../../utils/helpers";

const CategoryShowcase = () => {
  const [categories, setCategories] = useState([]);

  // fetch
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
    <Fragment>
      <section className="categories">
        <div className="container p-0">
          <h1 className="font-30 text-center prosto_one_regular pt-3 pb-3 mt-3 mb-3 home-cat-title">
            Categories
          </h1>
          <div className="row">
            {categories &&
              categories.map((category, key) => {
                return (
                  <div className="col-lg-2" key={key}>
                    <Link href={`/category/${category.id}`}>
                      <div className="position-relative mb-3 mx-2 img-demo">
                        <img
                          src={getStoragePath(
                            `category-image/${category.image}`
                          )}
                          alt={category.name}
                          className="category-img-one p-3 rounded-pill"
                        />
                        <div className="wavy-chips position-absolute">
                          <p className="position-absolute category-title text-center text-capitalize text-light font-20 fw-bold">
                            {category.name}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default CategoryShowcase;
