import React, { useEffect, useState } from "react";
import { getStoragePath } from "../../utils/helpers";
import VendorProduct from "../../components/vendorProduct/VendorProduct";
import { fetchVendorInventories } from "../../services/VendorServices";
import { fetchInventoriespreOrder } from "../../services/PreOrderServices";

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

  const initialCardCount = 12;
  const additionalCardCount = 8;
  const [visibleCards, setVisibleCards] = useState(initialCardCount);
  const totalCards = preOrder.length;
  console.log(totalCards)
  
  const loadMore = () => {
    const newVisibleCards = visibleCards + additionalCardCount;
    setVisibleCards(
      newVisibleCards > totalCards ? totalCards : newVisibleCards
    );
  };

  const showLess = () => {
    setVisibleCards(initialCardCount);
  };
  

  return (
    <>
      <section className="vendor_part_product pb-5">
       <div>
        <img src="/vendor.jpg" className="vendor_img"/>
       </div>
        <div className="container">
          <div>
            <h1 className="text-capitalize prosto_one_regular text-center display-5 fw-bold pt-5 pb-4">Pre-Order</h1>
          </div>
          <div className="row">
            {preOrder.slice(0, visibleCards).map((inventory, key) => {
              return (
                <div className="col-lg-3" key={key}>
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

         

          {visibleCards < totalCards ? (
              visibleCards === initialCardCount ? (
                <div className="d-flex justify-content-center mt-3">
                  <button type="submit" onClick={loadMore} className="requestBtn border-0">
                    More Services
                  </button>
                </div>
              ) : (
                <>
                  <div className="d-flex justify-content-center mt-3">
                     <button type="submit" onClick={loadMore} className="requestBtn border-0">
                     More Services
                     </button>
                  </div>
                </>
              )
            ) : (
                <div className="d-flex justify-content-center mt-3">
                  <button type="submit" onClick={showLess} className="requestBtn border-0">
                  Less Services
                  </button>
                </div>
            )}
        </div>
      </section>
    </>
  );
};

export default index;
