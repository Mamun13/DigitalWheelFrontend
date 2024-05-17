import React, { useState, useEffect } from "react";
import styles from "./AgeVerification.module.css";
import { RxCross2 } from "react-icons/rx";
import { Col, Container, Row } from "react-bootstrap";
import Link from "next/link";

const AgeVerification = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  
  useEffect(() => {
    const popup = localStorage.getItem("popup");
    if (popup) {
      setIsVisible(false);
    }
  }, []);

  const handleConfirm = () => {
    localStorage.setItem("popup", "true");
    setIsVisible(false); // Hide the overlay on confirmation
  };

  // const handleDeny = () => {
  //   setIsVisible(false);
  // };

  // Check for storage on every render (optional)
  useEffect(() => {
    const popup = localStorage.getItem("popup");
    if (!popup) {
      // If no storage, show the overlay
      setIsVisible(true);
    }
  }, []);

  // Clear storage on tab close (or window close)
  useEffect(() => {
    const handleStorage = () => {
      localStorage.removeItem("popup");
    };

    window.addEventListener("beforeunload", handleStorage); // Clear on close

    return () => window.removeEventListener("beforeunload", handleStorage); // Cleanup
  }, []);


 
  

  return (
    <>
      {isVisible && (
        <div className="vendor_popup p-3">
        <div>
        {!showMessage && (
                <> 
                
                  <button onClick={handleConfirm} className="float-end"><RxCross2 size={"20px"}/></button>
                 
                </>
              )}
        </div>
        <div className="">
          <Row>
            <Col lg={6} md={3} className="ps-0">
              <div className="position-relative v_overlay">
                <img
                  src="./v_overlay.jpg"
                  alt=""
                  className="img-fluid v_overlay_img"
                />
                <div className="vendor_popup_text">
                  <h4 className="font-20 text-capitalize prosto_one_regular pb-3">
                    in stock
                  </h4>
                  <Link href="/vendor" className="text-capitalize shop_button">
                    shop
                  </Link>
                </div>
              </div>
            </Col>
            <Col lg={6} md={3} className="ps-0">
              <div className="position-relative v_overlay2 extra_space">
                <img
                  src="./v_overlay.jpg"
                  alt=""
                  className="img-fluid v_overlay_img2"
                />
                <div className="vendor_popup_text">
                  <h4 className="font-20 text-capitalize prosto_one_regular pb-3">
                    pre-order
                  </h4>
                  <Link href="/pre_order" className="text-capitalize shop_button">
                    shop
                  </Link>
                </div>
              </div>

              <div className="position-relative v_overlay2">
                <img
                  src="./v_overlay.jpg"
                  alt=""
                  className="img-fluid v_overlay_img2"
                />
                <div className="vendor_popup_text">
                  <h4 className="font-20 text-capitalize prosto_one_regular pb-3">
                    sell products
                  </h4>
                  <Link href="sell_products" className="text-capitalize shop_button">
                    shop
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      )}
    </>
  );
};

export default AgeVerification;
