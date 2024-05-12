import React, { useEffect, useState } from "react";
import { getStoragePath } from "../../utils/helpers";
import VendorProduct from "../vendorProduct/VendorProduct";
import { fetchVendorInventories } from "../../services/VendorServices";
import { Container } from "react-bootstrap";

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
    const response = await fetch("https://api.adamsvibe.com/ecom/inventories");
    const allproduct = await response.json();
    // setInventories(allproduct); 
    const featuredProducts = allproduct.filter(product => product.is_special_deal === "1");
    setInventories(featuredProducts);
  };

  useEffect(() => {
    getData();
  }, []);


  const initialCardCount = 4;
  const additionalCardCount = 4;
  const [visibleCards, setVisibleCards] = useState(initialCardCount);
  const totalCards = inventories.length;
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
      <section className="vendor_part_feature pb-5">
        <Container fluid className="featured_padd">
          <div className="px-0">
            <p className="capitalize prosto_one_regular font-30">
              featured product
            </p>
          </div>
          <div className="row">
            {inventories.slice(0, visibleCards).map((inventory, key) => {  
              return (
                <div className="col-lg-3 ps-1" key={key}>
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
                        viewLink={`/product/${inventory.id}`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
            {visibleCards < totalCards ? (
              visibleCards === initialCardCount ? (
                <div className="d-flex justify-content-center mt-3 mb-3">
                  <button type="submit" onClick={loadMore} className="requestBtn border-0">
                    More Services
                  </button>
                </div>
              ) : (
                <>
                  <div className="d-flex justify-content-center mt-3 mb-3">
                     <button type="submit" onClick={loadMore} className="requestBtn border-0">
                     More Services
                     </button>
                  </div>
                </>
              )
            ) : (
                <div className="d-flex justify-content-center mt-3 mb-3">
                  <button type="submit" onClick={showLess} className="requestBtn border-0">
                  Less Services
                  </button>
                </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
};

export default index;
