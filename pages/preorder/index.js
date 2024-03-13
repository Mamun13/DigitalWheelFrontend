import React, { useEffect, useState } from "react";
import { getStoragePath } from "../../utils/helpers";
import Preorder from "../../components/Preorder/Preorder";
import { fetchVendorInventories } from "../../services/VendorServices";

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

  return (
    <>
      <section className="vendor_part">
       <div>
        <img src="/vendor.jpg" className="vendor_img"/>
       </div>
        <div className="container">
          <div className="row">
            {inventories.map((inventory, key) => {
              return (
                <div className="col-lg-3" key={key}>
                  <div className="mt-0">
                    <div className="my-3">
                      <Preorder
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
    </>
  );
};

export default index;
