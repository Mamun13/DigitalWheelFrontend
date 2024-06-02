import React, { useEffect, useState } from "react";
import { getStoragePath } from "../../utils/helpers";
import TopProduct from "../topProduct/TopProduct";
import { fetchFeaturedProduct } from "../../services/FeatureServices";
import { Col, Container } from "react-bootstrap";
import Slider from "react-slick";

const index = ({ title, categoryId }) => {
  const [featureinventories, setFeatureInventories] = useState([]);

  // fetch
  useEffect(() => {
    fetchFeaturedProduct(categoryId, {
      paginate: "no",
    }).then((response) => {
      if (response?.data) {
        setFeatureInventories(response.data);
      }
    });
  }, [categoryId]);
  var settings = {
    dots: false,
    arrow: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // const getData = async () => {
  //   const response = await fetch("https://api.adamsvibe.com/ecom/inventories"); 
  //   const allproduct = await response.json();
  //   // setInventories(allproduct); 
  //   const featuredProducts = allproduct.filter(product => product.is_special_deal === "1");
  //   setInventories(featuredProducts);
  // };

  // useEffect(() => {
  //   getData();
  // }, []);


  // const initialCardCount = 6;
  // const additionalCardCount = 6;
  // const [visibleCards, setVisibleCards] = useState(initialCardCount);
  // const totalCards = featureinventories.length;
  
  
  // const loadMore = () => {
  //   const newVisibleCards = visibleCards + additionalCardCount;
  //   setVisibleCards(
  //     newVisibleCards > totalCards ? totalCards : newVisibleCards
  //   );
  // };

  // const showLess = () => {
  //   setVisibleCards(initialCardCount);
  // };
  
  // const initialCardCount2 = 3;
  // const additionalCardCount2 = 3;
  // const [visibleCards2, setVisibleCards2] = useState(initialCardCount2);
  // const totalCards2 = featureinventories.length;
  // console.log(totalCards2)
  
  // const loadMore2 = () => {
  //   const newVisibleCards = visibleCards + additionalCardCount2;
  //   setVisibleCards2(
  //     newVisibleCards > totalCards2 ? totalCards2 : newVisibleCards
  //   );
  // };

  const showLess2 = () => {
    setVisibleCards2(initialCardCount2);
  };

console.log(featureinventories)
  return (
    <>
      <section className="vendor_part_feature pb-5">
        <Container className="featured_padd">
          <div className="px-0">
            <p className="text-capitalize text-center prosto_one_regular font-30 feature_text pt-4">
              top 10 trending product
            </p>
          </div>
          <div className="row ven_phn_div">
          <Slider {...settings}>
            {featureinventories.map((inventory, index) => {  
            // {featureinventories.slice(0, visibleCards).map((inventory, index) => {  
              return (
                <div className="col-lg-2 col-md-3 col-sm-4 px-2 ven_phn_div_card" key={index}>
                  <div className="mt-0">
                    <div className="my-2 my-sm-2">
                      <TopProduct
                        id={inventory.id}
                        Key={index}
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
            </Slider>
            {/* {visibleCards < totalCards ? (
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
            )} */}
          </div>
        </Container>
      </section>

      {/* for responsive */}
      {/* <section className="vendor_part_feature_responsive pb-5">
        <Container fluid className="featured_padd">
          <div className="px-0">
            <p className="capitalize prosto_one_regular font-30 pt-3">
              featured product
            </p>
          </div>
          <div className="row">
            {featureinventories.slice(0, visibleCards2).map((inventory, key) => {  
              return (
                 <div className="col-lg-3 col-md-4 col-sm-6 ps-1" key={key}>
                  <div className="mt-0">
                    <div className="my-3">
                      <p className="font-30">mamun</p>
                      <TopProduct
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
            {visibleCards2 < totalCards2 ? (
              visibleCards2 === initialCardCount2 ? (
                <div className="d-flex justify-content-center mt-3 mb-3">
                  <button type="submit" onClick={loadMore2} className="requestBtn border-0">
                    More Product
                  </button>
                </div>
              ) : (
                <>
                  <div className="d-flex justify-content-center mt-3 mb-3">
                     <button type="submit" onClick={loadMore2} className="requestBtn border-0">
                     More Product
                     </button>
                  </div>
                </>
              )
            ) : (
                <div className="d-flex justify-content-center mt-3 mb-3">
                  <button type="submit" onClick={showLess2} className="requestBtn border-0">
                    Less Product
                  </button>
                </div>
            )}
          </div>
        </Container>
      </section> */}
    </>
  );
};

export default index;
