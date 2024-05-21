import React, { useState, useEffect } from "react";
import styles from "./AgeVerification.module.css";
import { RxCross2 } from "react-icons/rx";
import { Col, Container, Row } from "react-bootstrap";
import Link from "next/link";

const AgeVerification = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [overlay, setOverlay] = useState("overlay_shadow");


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
  // const bgstyle = () => {
  //   setOverlay{overlay_shadow ? '' : 'overlay_shadow'}
  // };

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

  const [showDiv, setShowDiv] = useState(true);

  const handleDivClick = () => {
    setShowDiv(false);
  };

  return (
    <>
     {showDiv && (
         <section className="overlay_shadow">
         
           <div className="vendor_popup shadow p-3">
 
             <div className=" d-flex">
 
               <div className="position-relative">
                 {!showMessage && (
                   <>
                     <button onClick={handleConfirm} className="cross_btn">
                       <RxCross2 size={"30px"} color={"white"} onClick={handleDivClick}/>
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
      
       </section>
      )}
     
    </>
  );
};

export default AgeVerification;
