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
        <div className="container-fluid">
          {/* <h1 className="font-30 text-center prosto_one_regular pt-3 pb-3 mt-3 mb-3 home-cat-title">
            Categories
          </h1> */}
          <div className="row">
            {categories &&
              categories.map((category, key) => {
                return (
                  <div className="col-lg-3 col-md-3 px-2" key={key}>
                      <div className="position-relative mb-3 img-demo shadow">
                        <img
                          src={getStoragePath(
                            `category-image/${category.image}`
                          )}
                          alt={category.name}
                          className="category-img-one"
                        />
                        <div className="wavy-chips position-absolute">
                            <p className=" position-absolute category-title text-capitalize prosto_one_regular text-light font-20">
                              {category.name}
                            </p>
                           
                            <Link href={`/category/${category.id}`} className="px-2 text-light font-mont category_link">
                              <div className="position-absolute category_button d-flex justify-content-center align-items-center">
                                  Shop now
                              </div>
                            </Link>
                        </div>

                      </div>
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
