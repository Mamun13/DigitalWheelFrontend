import React, { useEffect, useState } from "react";
import { getStoragePath } from "../../utils/helpers";
import VendorProduct from "../../components/vendorProduct/VendorProduct";
import { fetchVendorInventories } from "../../services/VendorServices";
import ScrollToTopButton from "../../components/common/ScrollToTopButton";
import Form from 'react-bootstrap/Form';

const Index = ({ title, categoryId }) => {
  const [inventories, setInventories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [variantAmounts, setVariantAmounts] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");
  const [selectedWeight, setSelectedWeight] = useState("all");
  const [selectedColor, setSelectedColor] = useState("all");

  useEffect(() => {
    fetchVendorInventories(categoryId, {
      paginate: "no",
    }).then((response) => {
      if (response?.data) {
        const inventoryData = response.data;
        setInventories(inventoryData);
        // console.log(inventoryData);


        // Extract and filter unique subcategory names
        const subCategoryNames = inventoryData.map(
          (inventory) => inventory.product?.sub_category?.name
        );
        const allVariantOptions = inventoryData.flatMap(
          (inventory) => inventory.inventory_variants
        );
        const weightVariantNames = allVariantOptions
          .filter((variant) => variant.variant?.name === "Weight")
          .map((variant) => variant.variant_option?.name);
        const colorVariantNames = allVariantOptions
          .filter((variant) => variant.variant?.name === "Flavor")
          .map((variant) => variant.variant_option?.name);

        const uniqueSubCategoryNames = [...new Set(subCategoryNames)];
        const uniqueWeightNames = [...new Set(weightVariantNames)];
        const uniqueColorNames = [...new Set(colorVariantNames)];

        // Log the unique values before setting the state
        // console.log("Unique Sub Category Names:", uniqueSubCategoryNames);
        // console.log("Unique Weight Names:", uniqueWeightNames);
        // console.log("Unique Color Names:", uniqueColorNames);

        setSubCategories(uniqueSubCategoryNames);
        setVariantAmounts(uniqueWeightNames);
        setColorOptions(uniqueColorNames);
      }
    });
  }, [categoryId]);

  const handleSubCategoryChange = (event) => {
    setSelectedSubCategory(event.target.value);
  };

  const handleWeightChange = (event) => {
    setSelectedWeight(event.target.value);
  };

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const filteredInventories = inventories.filter((inventory) => {
    const matchesSubCategory =
      selectedSubCategory === "all" ||
      inventory.product?.sub_category?.name === selectedSubCategory;
    const matchesWeight =
      selectedWeight === "all" ||
      inventory.inventory_variants.some(
        (variant) => variant?.variant_option?.name === selectedWeight
      );
    const matchesColor =
      selectedColor === "all" ||
      inventory.inventory_variants.some(
        (variant) => variant?.variant_option?.name === selectedColor
      );
    return matchesSubCategory && matchesWeight && matchesColor;
  });

  const weightOptions = variantAmounts.map((option, index) => (
    <option key={index} value={option}>
      {option}
    </option>
  ));

  const colorOptionsElements = colorOptions.map((option, index) => (
    <option key={index} value={option}>
      {option}
    </option>
  ));

  return (
    <>
      <section className="vendor_part_product pb-5">
        <div className="position-relative vendor_banner_over">
          <img src="/vendor.png" className=" vendor_img" />
          <div className="in_stock_text">
            <h1 className="text-capitalize prosto_one_regular text-light display-5 fw-bold breadcrumb_title">
              in stock
            </h1>
          </div>
        </div>



        <div className="container">
          <div className="d-flex justify-content-end align-items-center bg-light mt-3 shadow rounded-1 p-3 main w-100">
            {/* <div>
              <p className="text-capitalize"> all products</p>

            </div> */}
            <div className="d-flex justify-content-end align-items-center filter_select_form">

              <div className=" d-flex align-items-center me-2 filter_select_form1">
                
                <label htmlFor="sub-category-filter" className="filter-label pe-2">
                  Sub_Category:
                </label>
                <select
                  id="sub-category-filter"
                  className="form-select product_filter rounded-1"
                  onChange={handleSubCategoryChange}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="all">All</option>
                  {subCategories.map((subCategory, index) => (
                    <option key={index} value={subCategory}>
                      {subCategory}
                    </option>
                  ))}
                </select>
              </div>

              {weightOptions.length > 0 && (
                <div className=" d-flex align-items-center me-2 filter_select_form2">
                  <label htmlFor="weight-filter" className="filter-label pe-2">
                    Weight:
                  </label>
                  <select
                    id="weight-filter"
                    className="form-select product_filter rounded-1"
                    onChange={handleWeightChange}
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="all">All</option>
                    {weightOptions}
                  </select>
                </div>
              )}

              {colorOptionsElements.length > 0 && (
                <div className=" d-flex align-items-center me-2 filter_select_form3">
                  <label htmlFor="color-filter" className="filter-label pe-2">
                    Color:
                  </label>
                  <select
                    id="color-filter"
                    className="form-select product_filter rounded-1"
                    onChange={handleColorChange}
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="all">All</option>
                    {colorOptionsElements}
                  </select>
                </div>
              )}
            </div>
          </div>


          <div className="row ven_phn_div">
            {filteredInventories.map((inventory, key) => (
              <div
                className="col-lg-2 col-md-3 col-sm-4 px-2 ven_phn_div_card"
                key={key}
              >
                <div className="mt-0">
                  <div className="my-2">
                    <VendorProduct
                      id={inventory.id}
                      categoryId={inventory?.product.category_id}
                      title={inventory.title}
                      salePrice={inventory.sale_price}
                      subCategoryName={inventory?.product?.sub_category?.name}
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
                      viewLink={`/vendorProduct/${inventory.id}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ScrollToTopButton />
    </>
  );
};

export default Index;
