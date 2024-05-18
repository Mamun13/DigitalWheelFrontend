import React, { useEffect, useState } from "react";
import { getStoragePath } from "../../utils/helpers";
import VendorProduct from "../../components/vendorProduct/VendorProduct";
import { fetchVendorInventories } from "../../services/VendorServices";
import { fetchInventoriespreOrder } from "../../services/PreOrderServices";
import ScrollToTopButton from "../../components/common/ScrollToTopButton";

const index = ({ title, categoryId }) => {
  const [preOrder, setPreOrder] = useState([]);

  // fetch
  useEffect(() => {
    fetchInventoriespreOrder(categoryId, {
      paginate: "no",
    }).then((response) => {
      if (response?.data) {
        setPreOrder(response.data);
      }
    });
  }, [categoryId]);

  // const initialCardCount = 12;
  // const additionalCardCount = 8;
  // const [visibleCards, setVisibleCards] = useState(initialCardCount);
  // const totalCards = preOrder.length;
  // console.log(totalCards)
  
  // const loadMore = () => {
  //   const newVisibleCards = visibleCards + additionalCardCount;
  //   setVisibleCards(
  //     newVisibleCards > totalCards ? totalCards : newVisibleCards
  //   );
  // };

  // const showLess = () => {
  //   setVisibleCards(initialCardCount);
  // };
  

  return (
    <>
      <section className="vendor_part_product pb-5">
      <div className="position-relative vendor_banner_over">
          <img src="/vendor.png" className=" vendor_img"/>
          <div className="in_stock_text">
            <h1 className="text-capitalize prosto_one_regular text-light display-5 fw-bold breadcrumb_title">pre-order</h1>
          </div>
        </div>

        <div className="container">
         
          <div className="row ven_phn_div">
            {preOrder.map((inventory, key) => {
              return (
                <div className="col-lg-2 col-md-3 col-sm-4 ven_phn_div_card" key={key}>
                  <div className="mt-0">
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
                        viewLink={`/preorderProduct/${inventory.id}`}
                      />
                    </div> 
                  </div>
                </div>
              );
            })}
          </div>

         

            {/* {visibleCards < totalCards ? (
                visibleCards === initialCardCount ? (
                  <div className="d-flex justify-content-center mt-3">
                    <button type="submit" onClick={loadMore} className="requestBtn border-0">
                      More Products
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="d-flex justify-content-center mt-3">
                      <button type="submit" onClick={loadMore} className="requestBtn border-0">
                      More Products
                      </button>
                    </div>
                  </>
                )
              ) : (
                  <div className="d-flex justify-content-center mt-3">
                    <button type="submit" onClick={showLess} className="requestBtn border-0">
                    Less Products
                    </button>
                  </div>
              )} */}
        </div>
      </section>
      <ScrollToTopButton/>
    </>
  );
};

export default index;
