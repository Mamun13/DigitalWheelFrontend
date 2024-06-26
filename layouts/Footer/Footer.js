import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import Api from "../../public/API-footer-logo.png";
import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaTwitter,
  FaLink,
} from "react-icons/fa";
import { AiOutlineInstagram } from "react-icons/ai";
import { fetchSocial } from "../../services/CommonServices";
import { BiChevronDown } from "react-icons/bi";
import { Col, Container, Row } from "react-bootstrap";
import { fetchContact } from "../../services/ContactServices";
import { MdHealthAndSafety } from "react-icons/md";

export default function Footer() {
  const [socials, setSocials] = useState([]);
  const [contact, setContact] = useState([]);

  // fetch
  useEffect(() => {
    fetchContact().then((response) => {
      if (response?.data) {
        setContact(response.data[0]?.contact_list);
      }
    });
  }, []);

  // fetch
  useEffect(() => {
    fetchSocial().then((response) => {
      if (response?.data) {
        setSocials(response.data[0]?.content_item);
      }
    });
  }, []);

  const linkIconMap = {
    facebook: <FaFacebookF size="25px" className="footer-soical-link ms-2" />,
    twitter: <FaTwitter size="25px" className="footer-soical-link ms-2" />,
    linkedin: <FaLinkedinIn size="25px" className="footer-soical-link ms-2" />,
    youtube: <FaYoutube size="25px" className="footer-soical-link ms-2" />,
    instagram: (
      <AiOutlineInstagram size="25px" className="footer-soical-link ms-2" />
    ),
    default: <FaLink size="25px" className="footer-soical-link ms-2" />,
  };

  return (
    <>
      <section className="footer_text_bg ">
        <div className="d-flex justify-content-center align-items-center py-3">
          <MdHealthAndSafety color={"white"} />
          <p className="text-center footer_slogan text-white ms-2">
            We are Committed to sustainable business solutions!
          </p>
        </div>
      </section>
      <section className="footer">
        <Container fluid>
          <Col lg={12}></Col>
          <Row>
            <Col lg={4} md={3} sm={6} className="footer_logo_bg">
              <div className="footer_text_color d-flex justify-content-center ">
                <div className="text-center">
                  <Link href="/" target="_blank" className="d-flex align">
                    <img
                      alt="logo"
                      src="/logo/vabe.png"
                      className="img-fluid footer-logo"
                      loading="lazy"
                    />
                  </Link>
                  {/* <div>
                    <p className="font-16">{contact[0]?.contact_address}</p>
                    <p className="font-14 ">{contact[0]?.contact_email}</p>
                  </div> */}
                </div>
              </div>
            </Col>
            <Col lg={8} className="pt-5 ps-5">
              <Row>
                <Col lg={3} md={3} sm={6}>
                  <div>
                    <h5 className="text-capitalize legal_terms prosto_one_regular text-light">
                      policy
                    </h5>
                    <ul className="mt-3 legal_terms_list">
                      <li className="nav-item pb-2">
                        <Link href="/privacy-policy" className="nav-link-ifad">
                          privacy & policy
                        </Link>
                      </li>
                      <li className="nav-item pb-2">
                        <Link
                          href="/terms-and-conditions"
                          className="nav-link-ifad"
                        >
                          terms & conditions
                        </Link>
                      </li>
                      <li className="nav-item pb-2">
                        <Link href="/refund-policy" className="nav-link-ifad">
                          refund policy
                        </Link>
                      </li>
                      <li className="nav-item pb-2">
                        <Link
                          href="/delivery-information"
                          className="nav-link-ifad"
                        >
                          Delivery Information
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col lg={3} md={3} sm={6}>
                  <div>
                    <h5 className="text-capitalize accounts_part prosto_one_regular text-light mb-3">
                      help
                    </h5>
                    <ul className="navbar-nav footer_manu_list">
                      <li className="nav-item pb-2">
                        <Link href="/my-account" className="nav-link-ifad">
                          my account
                        </Link>
                      </li>

                      <li className="nav-item pb-2">
                        <Link href="/vendor-request" className="nav-link-ifad">
                          my cart
                        </Link>
                      </li>
                      <li className="nav-item pb-2">
                        <Link href="/company-profile" className="nav-link-ifad">
                          about us
                        </Link>
                      </li>
                      <li className="nav-item pb-2">
                        <Link href="/contact" className="nav-link-ifad">
                          contact
                        </Link>
                      </li>
                      <li className="nav-item pb-2">
                        <Link href="/faqs" className="nav-link-ifad">
                          FAQs
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col lg={3} md={3} sm={6}>
                  <div>
                    <h5 className="text-capitalize accounts_part prosto_one_regular text-light mb-3">
                      Vendor
                    </h5>
                    <ul className="navbar-nav footer_manu_list">
                      <li className="nav-item pb-2">
                        <Link href="/vendor-request" className="nav-link-ifad">
                          Vendor Request
                        </Link>
                      </li>

                      <li className="nav-item pb-2">
                        <Link href="/vendor" className="nav-link-ifad">
                          Wholesale
                        </Link>
                      </li>
                      <li className="nav-item pb-2">
                        <Link href="/bulk_in_stock" className="nav-link-ifad">
                          Bulk In stock
                        </Link>
                      </li>
                      <li className="nav-item pb-2">
                        <Link href="/pre_order" className="nav-link-ifad">
                          Pre-Order
                        </Link>
                      </li>
                      <li className="nav-item pb-2">
                        <Link href="/vendor-request" className="nav-link-ifad">
                          Become a wholesaler
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Col>

                <Col lg={3} md={3} sm={6}>
                  <div className="text-light payment_part">
                    <div>
                      <h5 className="text-capitalize payment_text prosto_one_regular text-light mb-3">
                        social
                      </h5>
                      {/* <img
                        src="/payment.png"
                        className="img-fluid rounded footer_payment payment_img"
                      /> */}
                    </div>
                  </div>
                  <div className="footer_logo_part">
                    <div className="pt-3 ps-0 footer_social_icon">
                      {socials?.map((social, index) => (
                        <Link
                          key={index}
                          href={social?.item_link}
                          target="_blank"
                          className="text-light"
                        >
                          {
                            linkIconMap[
                              social?.item_link.includes("facebook.com")
                                ? "facebook"
                                : social?.item_link.includes("linkedin.com")
                                ? "linkedin"
                                : social?.item_link.includes("twitter.com")
                                ? "twitter"
                                : social?.item_link.includes("youtube.com")
                                ? "youtube"
                                : social?.item_link.includes("instagram.com")
                                ? "instagram"
                                : "default"
                            ]
                          }
                        </Link>
                      ))}
                    </div>
                  </div>
                </Col>
              </Row>
              <div className="pt-5">
                <img src="/footer_payment.png" alt="" className=" img-fluid" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <footer className="text-center shadow-inner footer-bg  ">
        <div className="d-flex justify-content-center position-relative footer_width">
          <p className="text-center text-light p-0 mt-3 mb-3 pe-2 font-lato copyrights">
            © {new Date().getFullYear()} Digital Wheel. All Rights Reserved |
            Developed by
            <Link
              href="https://codersmind.vercel.app/"
              target="_blank"
              className="fw-bolder "
            >
              CM23
            </Link>
          </p>
        </div>
      </footer>
    </>
  );
}
