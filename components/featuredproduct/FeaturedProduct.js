import React, { useEffect, useState } from "react";
import { getStoragePath } from "../../utils/helpers";
import VendorProduct from "../vendorProduct/VendorProduct";
import { fetchVendorInventories } from "../../services/VendorServices";

const index = ({ title, categoryId }) => {
  const [inventories, setInventories] = useState([]);

  // fetch
  // useEffect(() => {
  //   fetchVendorInventories(categoryId, {
  //     paginate: "no",
  //   }).then((response) => {
  //     if (response?.data) {
  //       setInventories(response.data);
  //     }
  //   });
  // }, [categoryId]);

  const getData = async () => {
    const response = await fetch("https://api.codersmind23.com/ecom/inventories");
    const allproduct = await response.json();
    // setInventories(allproduct); 
    const featuredProducts = allproduct.filter(product => product.is_special_deal === "1");
    setInventories(featuredProducts);
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(inventories)

  return (
    <>
      <section className="vendor_part">
        <div className="container">
          <div className="border-bottom border-secondary">
            <p className="capitalize prosto_one_regular">featured product</p>
          </div>
          <div className="row">
            {inventories.map((inventory, key) => {
              return (
                <div className="col-lg-3">
                  <div className="mt-0" key={key}>
                    <div className="my-3">
                      <VendorProduct
                        id={inventory.id}
                        categoryId={inventory?.product.category_id}
                        title={inventory.title}
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
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default index;
