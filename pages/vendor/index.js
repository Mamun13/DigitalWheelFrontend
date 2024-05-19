import React, { useEffect, useState } from "react";
import { getStoragePath } from "../../utils/helpers";
import VendorProduct from "../../components/vendorProduct/VendorProduct";
import { fetchVendorInventories } from "../../services/VendorServices";
import ScrollToTopButton from "../../components/common/ScrollToTopButton";
import Form from "react-bootstrap/Form";

const index = ({ title, categoryId }) => {
  const [inventories, setInventories] = useState([]);

  // fetch
  useEffect(() => {
    fetchVendorInventories(categoryId, {
      paginate: "no",
    }).then((response) => {
      if (response?.data) {
        setInventories(response.data);
      }
    });
  }, [categoryId]);
  console.log(inventories[0]);

  const itemfilter = (id) => {
    const items = inventories.filter((i) => i.product.sub_category?.id === id);
    setFilteredinventory(items);
  };


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
          <div>
            <div className="d-flex justify-content-between align-items-center bg-light shadow rounded-1 mt-3 py-3 px-3">
              <div>
                <p className="text-capitalize">all products</p>
              </div>
              <div>
                <Form.Select aria-label="Default select example">
                  <option> select category</option>
                   
                 
                </Form.Select>
                
              </div>
            </div>
          </div>
          <div className="row ven_phn_div">
            {inventories.map((inventory, key) => {
              return (
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
              );
            })}
          </div>
        </div>
      </section>
      <ScrollToTopButton />
    </>
  );
};

export default index;
