import React, { Fragment, useEffect, useState } from "react";
import ScrollToTopButton from "../../../components/common/ScrollToTopButton";
import { useRouter } from "next/router";
import {
  fetchCategories,
  fetchCategory,
} from "../../../services/CategoryServices";
import { fetchInventoriesByCategory } from "../../../services/InventoryServices";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";
import ProductCard from "../../../components/common/ProductCard";
import { getStoragePath, makeTitle } from "../../../utils/helpers";
import Head from "next/head";
import axios from "axios";

import Accordion from "react-bootstrap/Accordion";
import { filter } from "lodash";

const CategoryPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [category, setCategory] = useState({});
  const [categories, setCategories] = useState([]);
  const [inventories, setInventories] = useState([]);
  const [filteredInventory, setFilteredinventory] = useState([]);

  const [meta, setMeta] = useState({});
  const [page, setPage] = useState("");

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

  // fetch
  useEffect(() => {
    if (id) {
      fetchCategory(id).then((response) => {
        if (response?.data) {
          setCategory(response.data);
        }
      });
    }
  }, [id]);

  const fetchInventoriesByCategoryData = (id, params = {}) => {
    fetchInventoriesByCategory(id, params).then((response) => {
      // if (response?.data?.data) { // if paginate: "yes"
      //     setInventories(response.data.data);
      //     setMeta(response.data.meta);
      // }
      if (response?.data) {
        // if paginate: "no"
        setInventories(response.data);
        setFilteredinventory(response.data);
      }
    });
  };

  // fetch
  useEffect(() => {
    if (id) {
      fetchInventoriesByCategoryData(id, {
        paginate: "no",
      });
    }
  }, [id]);

  // paginate
  useEffect(() => {
    if (page && id) {
      fetchInventoriesByCategoryData(id, {
        page: page,
        paginate: "yes",
      });
    }
  }, [page]);

  const itemfilter = (id) => {
    const items = inventories.filter((i) => i.product.sub_category?.id === id);
    setFilteredinventory(items);
  };

  return (
    <Fragment>
      <Head>
        <title>category | Digital Wheel</title>
      </Head>
      <section className="all_product_accordion">
        {/*Category Banner*/}
        {category?.lifestyle_image && (
          <div className="product-banner">
            <img
              src={getStoragePath(
                `category-image/${category?.lifestyle_image}`
              )}
              alt="category-image"
              className="product-banner"
            />
          </div>
        )}

        <div className="container">
          {/*Category  Info*/}
          <div className="w-100 mb-5">
            <h1 className="fw-bolder text-center mt-5 font-40 font-lato our-product">
              {category?.name && category.name}
            </h1>
          </div>

          <div className="row">
            {/*Category Sidebar*/}
            <div className="col-lg-3 col-md-4 col-sm-5 mb-3">
              <div className="accordion_focus catagory_side_nv rounded-1">
                {categories?.map((item, index) => {
                  return (
                    <>
                      <Accordion key={index}>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>{item.name}</Accordion.Header>
                          {item?.sub_categories?.length ? (
                            <Accordion.Body>
                              <ul className="ps-3">
                                {item?.sub_categories &&
                                  item.sub_categories.map(
                                    (sub_items, index) => (
                                      <Link href={`/category/${item.id}`}>
                                        <li
                                          className="pb-2 font-18"
                                          key={index}
                                          // onClick={(e) =>
                                          //   subactive()
                                          // }
                                        >
                                          <button
                                            onClick={(e) =>
                                              itemfilter(sub_items.id)
                                              // active()
                                            }
                                          >
                                            {sub_items?.name}
                                          </button>
                                        </li>
                                      </Link>
                                    )
                                  )}
                              </ul>
                            </Accordion.Body>
                          ) : (
                            ""
                          )}
                        </Accordion.Item>
                      </Accordion>
                    </>
                  );
                })}
              </div>
            </div>

            {/*Category Products*/}
            <div className="col-lg-9 col-md-8 col-sm-7">
              <div className="row">
                {filteredInventory.map((inventory, key) => {
                  return (
                    <div
                      className="col-lg-3 col-md-6 text-center mb-4"
                      key={key}
                    >
                      <ProductCard
                        id={inventory.id}
                        title={inventory.title}
                        sku={inventory.sku}
                        categoryName={inventory?.product?.category?.name}
                        subCategoryName={inventory?.product?.sub_category?.name}
                        salePrice={inventory.sale_price}
                        offerPrice={inventory.offer_price}
                        offerStart={inventory.offer_start}
                        offerEnd={inventory.offer_end}
                        variants={inventory.inventory_variants}
                        imagePath={
                          inventory?.image
                            ? getStoragePath(
                                `inventory-image/${inventory?.image}`
                              )
                            : getStoragePath(
                                `product-image/${inventory?.product?.image}`
                              )
                        }
                        viewLink={`/product/${inventory.id}`}
                        cssClasses="category-product"
                      />
                    </div>
                  );
                })}
              </div>
              {/* <div className="my-3 d-flex justify-content-center">
                            <CustomPagination meta={meta} setPage={setPage}/>
                        </div> */}
            </div>
          </div>
        </div>

        <ScrollToTopButton />
      </section>
    </Fragment>
  );
};

export default CategoryPage;
