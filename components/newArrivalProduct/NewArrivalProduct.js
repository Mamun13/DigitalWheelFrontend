import React, { useEffect, useState } from "react";
import { getStoragePath } from "../../utils/helpers";
import NewArrival from "../newArrival/NewArrival";
import { fetchInventories } from "../../services/InventoryServices";
import Slider from "react-slick";


const index = ({ title, categoryId }) => {
  const [inventories, setInventories] = useState([]);

  // fetch
  useEffect(() => {
    fetchInventories(categoryId, {
      paginate: "no",
    }).then((response) => {
      if (response?.data) {
        setInventories(response.data);
      }
    });
  }, [categoryId]);

  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrow: false,
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

  return (
    <>
      <section className="vendor_part">
        <div className="container fluid">
          <div className="row">
          <Slider {...settings}>
            {inventories.map((inventory, key) => {
              return (
                <div className="col-lg-3 px-2">
                  <div className="mt-0" key={key}>
                    <div className="my-3">
                      <NewArrival
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
            </Slider>
          </div>
        </div>
      </section>
    </>
  );
};

export default index;
