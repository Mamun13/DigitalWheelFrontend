import React, { useState, useEffect } from "react";
import styles from "./AgeVerification.module.css";
import { RxCross2 } from "react-icons/rx";
import { Col, Container, Row } from "react-bootstrap";
import Link from "next/link";

const AgeVerification = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const isOver18 = localStorage.getItem("isOver18");
    if (isOver18) {
      setIsVisible(false);
    }
  }, []);

  const handleConfirm = () => {
    localStorage.setItem("isOver18", "true");
    setIsVisible(false); // Hide the overlay on confirmation
  };

  const handleDeny = () => {
    setShowMessage(true);
  };

  // Check for storage on every render (optional)
  useEffect(() => {
    const isOver18 = localStorage.getItem("isOver18");
    if (!isOver18) {
      // If no storage, show the overlay
      setIsVisible(true);
    }
  }, []);

  // Clear storage on tab close (or window close)
  useEffect(() => {
    const handleStorage = () => {
      localStorage.removeItem("isOver18");
    };

    window.addEventListener("beforeunload", handleStorage); // Clear on close

    return () => window.removeEventListener("beforeunload", handleStorage); // Cleanup
  }, []);

  return (
    <>
      {isVisible && (
        <div className={styles.overlayVisible}>
          <div className="">
            <div className="">
              {!showMessage && (
                <>

                  <div className="vendor_popup shadow p-3">

                    <div className=" d-flex position-relative">
                      <div className="">
                        {!showMessage && (
                          <>
                            <button onClick={handleConfirm} className="cross_btn p-0">
                              <RxCross2 size={"30px"} color={"white"} onClick={handleConfirm} />
                            </button>
                          </>
                        )}
                      </div>

                      <div className="">
                        <Row>
                          <Col lg={6} md={6} sm={12} className="pe-lg-0">
                            <div className="position-relative v_overlay">
                              <img
                                src="./sell.jpg"
                                alt=""
                                className="img-fluid v_overlay_img"
                              />
                              <div className="vendor_popup_text">
                                <h4 className="font-20 ven_overlay_text text-capitalize prosto_one_regular pb-3">
                                  sell products
                                </h4>
                                <Link
                                  href="#"
                                  className="text-capitalize shop_button"
                                >
                                  shop
                                </Link>
                              </div>
                            </div>
                          </Col>
                          <Col lg={6} md={6} sm={12}>
                            <div className="overlay_for_phn">
                              <div className="position-relative v_overlay2 extra_space">
                                <img
                                  src="./in_stock.jpg"
                                  alt=""
                                  className="img-fluid v_overlay_img2"
                                />
                                <div className="vendor_popup_text">
                                  <h4 className="font-20 ven_overlay_text text-capitalize prosto_one_regular pb-3">
                                    in stock
                                  </h4>
                                  <Link
                                    href="/vendor"
                                    className="text-capitalize shop_button"
                                  >
                                    shop
                                  </Link>
                                </div>
                              </div>

                              <div className="position-relative v_overlay2">
                                <img
                                  src="./preorder.jpg"
                                  alt=""
                                  className="img-fluid v_overlay_img2"
                                />
                                <div className="vendor_popup_text">
                                  <h4 className="font-20 ven_overlay_text text-capitalize prosto_one_regular pb-3">
                                    pre-order
                                  </h4>
                                  <Link
                                    href="/pre_order"
                                    className="text-capitalize shop_button"
                                  >
                                    shop
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>

                  </div>
                </>
              )}
              {showMessage && (
                <p className={styles.message}>Please visit when you are 21</p>
              )}
            </div>
          </div>
        </div>
        // {isVisible && (
        //     <section className="overlay_shadow">

        //     <div className="vendor_popup shadow p-3">

        //       <div className=" d-flex position-relative">

        //         <div className="">
        //           {!showMessage && (
        //             <>
        //               <button onClick={handleConfirm} className="cross_btn">
        //                 <RxCross2 size={"30px"} color={"white"} onClick={handleConfirm}/>
        //               </button>
        //             </>
        //           )}
        //         </div>

        //         {/* <div className="">
        //           <Row>
        //             <Col lg={6} md={6} sm={12} className="pe-lg-0">
        //               <div className="position-relative v_overlay">
        //                 <img
        //                   src="./sell.jpg"
        //                   alt=""
        //                   className="img-fluid v_overlay_img"
        //                 />
        //                 <div className="vendor_popup_text">
        //                   <h4 className="font-20 ven_overlay_text text-capitalize prosto_one_regular pb-3">
        //                     sell products
        //                   </h4>
        //                   <Link
        //                     href="#"
        //                     className="text-capitalize shop_button"
        //                   >
        //                     shop
        //                   </Link>
        //                 </div>
        //               </div>
        //             </Col>
        //             <Col lg={6} md={6} sm={12}>
        //               <div className="overlay_for_phn">
        //                 <div className="position-relative v_overlay2 extra_space">
        //                   <img
        //                     src="./in_stock.jpg"
        //                     alt=""
        //                     className="img-fluid v_overlay_img2"
        //                   />
        //                   <div className="vendor_popup_text">
        //                     <h4 className="font-20 ven_overlay_text text-capitalize prosto_one_regular pb-3">
        //                       in stock
        //                     </h4>
        //                     <Link
        //                       href="/vendor"
        //                       className="text-capitalize shop_button"
        //                     >
        //                       shop
        //                     </Link>
        //                   </div>
        //                 </div>

        //                 <div className="position-relative v_overlay2">
        //                   <img
        //                     src="./preorder.jpg"
        //                     alt=""
        //                     className="img-fluid v_overlay_img2"
        //                   />
        //                   <div className="vendor_popup_text">
        //                     <h4 className="font-20 ven_overlay_text text-capitalize prosto_one_regular pb-3">
        //                       pre-order
        //                     </h4>
        //                     <Link
        //                       href="/pre_order"
        //                       className="text-capitalize shop_button"
        //                     >
        //                       shop
        //                     </Link>
        //                   </div>
        //                 </div>
        //               </div>
        //             </Col>
        //           </Row>
        //         </div> */}
        //       </div>

        //     </div>

        // </section>
      )}
    </>
  );
};

export default AgeVerification;
