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

export default function Footer() {
  const [socials, setSocials] = useState([]);

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
    <Fragment>
      <div className="container-fluid footer">
        <div className="container">
          <div className="row">
            <div className="swiper">
              <section className="my-5">
                <Container>
                  <Row>
                    <Col lg={3}>
                      <div className="footer_text_color">
                        <Link href="/" target="_blank">
                          <img
                            alt="logo"
                            src="/logo/LOGO.png"
                            className="img-fluid footer-logo mb-4"
                            loading="lazy"
                          />
                        </Link>
                        <p className="font-16">mirpur 10, dhaka</p>
                        <p className="font-14">demo@gmail.com</p>
                        
                      </div>
                    </Col>
                    <Col lg={3}>
                      <div>
                        <h5 className="text-capitalize prosto_one_regular text-light">
                          legal terms
                        </h5>
                        <ul className="mt-3">
                          <li className="nav-item pb-2">
                            <Link
                              href="/privacy-policy"
                              className="nav-link-ifad"
                            >
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
                            <Link
                              href="/refund-policy"
                              className="nav-link-ifad"
                            >
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
                    <Col lg={3}>
                      <div>
                        <h5 className="text-capitalize prosto_one_regular text-light mb-3">
                          accounts
                        </h5>
                        <ul className="navbar-nav footer_manu_list">
                          <li className="nav-item pb-2">
                            <Link href="/auth/login" className="nav-link-ifad">
                              login
                            </Link>
                          </li>
                          <li className="nav-item pb-2">
                            <Link href="/checkout" className="nav-link-ifad">
                              checkout
                            </Link>
                          </li>
                          <li className="nav-item pb-2">
                            <Link href="/my-account" className="nav-link-ifad">
                              my account
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </Col>
                    <Col lg={3}>
                      <div className="text-light">
                        <h5 className="text-capitalize prosto_one_regular text-light mb-3">
                          connect with us
                        </h5>
                        {socials?.map((social, index) => (
                          <Link
                            key={index}
                            href={social?.item_link}
                            target="_blank"
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
                    </Col>
                    {/* <Col lg={3}>
                      <div>
                        <h5 className="text-capitalize prosto_one_regular text-light mb-3">
                          subscribe
                        </h5>
                        <form>
                          <div class="mb-3">
                            <input type="email" class="form-control" id="" />
                          </div>

                          <button type="submit" class="btn btn-primary">
                            Submit
                          </button>
                        </form>
                      </div>
                    </Col> */}
                  </Row>
                </Container>
              </section>
            </div>
          </div>
        </div>
      </div>

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
    </Fragment>
  );
}
