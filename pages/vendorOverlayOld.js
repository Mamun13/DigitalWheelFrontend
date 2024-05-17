import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { Col, Container, Row } from "react-bootstrap";
import Link from "next/link";

const vendorOverlay = () => {
  const [divVisible, setDivVisible] = useState(true);
 
  const handleClick = () => {
    setDivVisible(false);
  };

  return (
    <>
      {divVisible && (
        <div className="vendor_popup p-3">
          <div>
            <button onClick={handleClick} className="float-end">
              <RxCross2 size={"20px"}/>
            </button>
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
                    <Link href="" className="text-capitalize shop_button">
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

export default vendorOverlay;
