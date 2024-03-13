import { Container, Row, Col } from "react-bootstrap";
import CategoryProductScroll from "../home/CategoryProductScroll";
import Slider from "react-slick";
import React, { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import Card from "react-bootstrap/Card";
import moment from "moment";
import { tostify } from "../../utils/helpers";
import { toast } from "react-toastify";
import { SET_CART_ITEM } from "../../store/slices/CartSlice";
import { randomInt } from "next/dist/shared/lib/bloom-filter/utils";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getStoragePath } from "../../utils/helpers";
import { fetchInventories } from "../../services/InventoryServices";

const NewArrival = () => {
  const [inventories, setInventories] = useState([]);

  // fetch
  useEffect(() => {
    fetchInventories({
      paginate: "no",
    }).then((response) => {
      if (response?.data) {
        setInventories(response.data);
      }
    });
  }, []);
  // console.log(inventories);

  // var settings = {
  //   dots: false,
  //   infinite: true,
  //   speed: 2000,
  //   autoplay: true,
  //   autoplaySpeed: 2500,
  //   slidesToShow: 4,
  //   slidesToScroll: 1,
  //   arrow: true,
  //   responsive: [
  //     {
  //       breakpoint: 1200,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 1,
  //       },
  //     },
  //     {
  //       breakpoint: 992,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 1,
  //       },
  //     },
  //     {
  //       breakpoint: 767,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 1,
  //       },
  //     },
  //     {
  //       breakpoint: 576,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //       },
  //     },
  //   ],
  // };

  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const cart = useSelector((state) => state.cart);
  const [inventory, setInventory] = useState({});
  const [isWishlist, setIsWishlist] = useState(false);
  const [isRunningOffer, setIsRunningOffer] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const incQuantity = (event) => {
    event.preventDefault();
    setQuantity(quantity + 1);
  };

  const decQuantity = (event) => {
    event.preventDefault();

    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      alert("Minimum quantity 1");
      setQuantity(1);
    }
  };

  useEffect(() => {
    if (id) {
      fetchInventory(id).then((response) => {
        if (response?.data) {
          const inventory = response.data;

          setInventory(inventory);

          const today = moment().format("YYYY-MM-DD");
          const myOfferStart = inventory.offer_start
            ? moment(inventory.offer_start).format("YYYY-MM-DD")
            : null;
          const myOfferEnd = inventory.offer_end
            ? moment(inventory.offer_end).format("YYYY-MM-DD")
            : null;

          if (inventory?.offer_price) {
            if (myOfferStart !== null && myOfferEnd !== null) {
              setIsRunningOffer(myOfferStart <= today && myOfferEnd >= today);
            } else {
              setIsRunningOffer(true);
            }
          }
        }
      });
    }
  }, [id]);

  useEffect(() => {
    if (inventory?.id && isLoggedIn()) {
      wishlistStatus(inventory?.id).then((response) => {
        if (response?.data) {
          setIsWishlist(response?.data?.favourite);
        }
      });
    }
  }, [inventory?.id]);

  const handleFavourite = () => {
    syncWishlist({
      inventory_id: inventory?.id,
    }).then((response) => {
      if (response?.data) {
        tostify(toast, "success", response);

        if (response?.data?.data) {
          setIsWishlist(response?.data?.data?.favourite);
        }
      }
    });
  };

  const handleAddToCart = (event, inventory, buyNow = false) => {
    event.preventDefault();

    try {
      if (!quantity) {
        tostify(toast, "warning", {
          message: "Quantity shouldn't empty!",
        });
        return false;
      }

      const unitPrice = isRunningOffer
        ? inventory.offer_price
        : inventory.sale_price;

      dispatch(
        SET_CART_ITEM({
          id: randomInt(11111111, 999999999),
          inventory_id: inventory.id,
          quantity: quantity,
          unit_price: unitPrice,
          total: quantity * unitPrice,

          type: "product",
          sku: inventory.sku,
          title: inventory.title,
          category_name: inventory?.product?.category?.name,
          sub_category_name: inventory?.product?.sub_category?.name,
          image: inventory?.image
            ? getStoragePath(`inventory-image/${inventory?.image}`)
            : getStoragePath(`product-image/${inventory?.product?.image}`),
          variations: "",
          variant_id: inventory.inventory_variants[0].variant.id,
          variant_name: inventory.inventory_variants[0].variant.name,
          variant_quantity: inventory.inventory_variants[0].variant_option.name,
        })
      );

      tostify(toast, "success", {
        message: "Added to Cart",
      });

      setQuantity(1);

      if (buyNow) {
        setTimeout(() => {
          router.push("/checkout");
        }, 2000);
      }
    } catch (err) {
      tostify(toast, "warning", {
        message: err.message,
      });
    }
  };

  const calculateDiscount = (sale, offer) => {
    return Math.round(((sale - offer) / sale) * 100);
  };
  return (
    <>
      <section>
        <div className="mamun">
          <div className="scroll text3">
            <div className="">
              <span className="prosto_one_regular"> Hello World • </span>
              <span className="prosto_one_regular">Hello World • </span>
              <span className="prosto_one_regular">Hello World • </span>
              <span className="prosto_one_regular">Hello World • </span>
            </div>
            <div>
              <span className="prosto_one_regular"> Hello World • </span>
              <span className="prosto_one_regular">Hello World • </span>
              <span className="prosto_one_regular">Hello World • </span>
              <span className="prosto_one_regular">Hello World • </span>
            </div>
            <div>
              <span className="prosto_one_regular"> Hello World • </span>
              <span className="prosto_one_regular">Hello World • </span>
              <span className="prosto_one_regular">Hello World • </span>
              <span className="prosto_one_regular">Hello World • </span>
            </div>
          </div>
        </div>
        <Container>
          <div>
            {/* <h1 className="prosto_one_regular display-6">
              Latest Arrival Products
            </h1> */}
          </div>
          <Row>
            {/* <Col lg={4}>
             <CategoryProductScroll /> 
             </Col> */}

            {/* <Slider {...settings}> */}
            {inventories.map((curElem, key) => {
              return (
                <>
                  <Col lg={3}>
                    <Card className="c-shadow rounded-3 mx-3 mb-4">
                      <div className="combo-img-bg position-relative">
                        <Link href={`/product/${inventory.id}`}>
                          <img
                            src={getStoragePath(
                              `product-image/${curElem?.product?.image}`
                            )}
                            width={224}
                            height={172}
                            className="card-img-top mt-4 mb-4 rounded-top"
                            alt=""
                          />
                        </Link>
                        {curElem.sale_price &&
                        curElem.offer_price &&
                        curElem.sale_price > curElem.offer_price ? (
                          <div className="position-absolute offer-token text-center">
                            <span className="text-white veri-align fw-semibold font-14 pt-2">
                              -
                              {calculateDiscount(
                                curElem.sale_price,
                                curElem.offer_price
                              )}
                              %
                            </span>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <Card.Body className="prod-card-body">
                        <Card.Title className="text-center text-capitalize font-18">
                          <Link
                            href={`/product/${id}`}
                            className="prod-title m-0"
                            title=""
                          >
                            {curElem.title}
                          </Link>
                        </Card.Title>

                        {isRunningOffer ? (
                          <Fragment>
                            <del>
                              <Card.Text className="text-center text-capitalize">
                                Price: {curElem.sale_price} Tk.
                              </Card.Text>
                            </del>
                            <Card.Text className="text-center pb-2 text-capitalize">
                              offer Price: {curElem.offerPrice} Tk.
                            </Card.Text>
                          </Fragment>
                        ) : (
                          <Card.Text className="text-center pb-2 text-capitalize">
                            Price: {curElem.sale_price} Tk.
                          </Card.Text>
                        )}

                        {/* {variants && (
                          <Card.Text className="text-center pb-2 text-capitalize">
                            {variants.map((item, index) => (
                              <Fragment key={index}>
                                {item.variant.name}: {item.variant_option.name}
                                {index !== variants.length - 1 && ", "}
                              </Fragment>
                            ))}
                          </Card.Text>
                        )}  */}

                        <div className="d-flex justify-content-center">
                          <button
                            type="button"
                            className="btn btn-success buy-now rounded-0 text-capitalize px-2 font-14 me-2 font-lato"
                            onClick={(event) => handleAddToCart(event, true)}
                          >
                            buy now
                          </button>
                          <button
                            type="button"
                            className="btn btn-warning buy-add-btn rounded-0 text-capitalize px-2 font-14 font-lato"
                            onClick={(event) => handleAddToCart(event)}
                          >
                            add to cart
                          </button>
                        </div>
                        {/* {isTimer && isRunningOffer && (
                    <div style={{padding: "10px 0 0", textAlign: "center", fontWeight: "bold"}}>
                        <Timer startDate={offerStart} endDate={offerEnd} />
                    </div>
                )}  */}
                      </Card.Body>
                    </Card>
                  </Col>
                </>
              );
            })}
            {/* </Slider>   */}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default NewArrival;
