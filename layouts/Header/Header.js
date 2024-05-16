import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import { BiUser } from "react-icons/bi";
import { MdOutlineLogout } from "react-icons/md";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Image from "next/image";
// import Logo from "../../public/logo/LOGO.png";
import Logo from "../../public/logo/whitelogo.png";
import { BiChevronDown } from "react-icons/bi";
import { BiAlignLeft } from "react-icons/bi";

import CartOverlys from "./CartOverlay";
import { fetchCategories } from "../../services/CategoryServices";
import { isLoggedIn, logout } from "../../utils/auth";
import { useRouter } from "next/router";
import Overlay from "./Overlay";

export default function Header() {
  const router = useRouter();
  const { keyword } = router.query;

  const [storedToken, setStoredToken] = useState();
  const [storeLocal, setStoreLocal] = useState();
  const [categories, setCategories] = useState([]);
  const [reIsLoggedIn, setReIsLoggedIn] = useState(false);
  const [customerType, setCustomerType] = useState(null);

  useEffect(() => {
    if (isLoggedIn()) {
      setReIsLoggedIn(isLoggedIn());
    }
  }, []);

  useEffect(() => {
    setStoredToken(localStorage?.getItem("token"));

    fetchCategories({
      paginate: "no"
    }).then((response) => {
      if (response?.data) {
        setCategories(response.data);
      }
    });
  }, []);

  useEffect(() => {
    // Get the data from localStorage
    const localStorageData = localStorage.getItem("persist:root");

    if (localStorageData) {
      // Parse the JSON string to an object
      const parsedData = JSON.parse(localStorageData);

      // Access the auth object and parse it if it exists
      const authData = parsedData.auth ? JSON.parse(parsedData.auth) : null;

      if (authData) {
        // Access and store the customer_type data
        const customerType = authData.customer_type;
        setCustomerType(customerType);
      }
    }
  }, []);

 

  return (
    <Fragment>
      <header className="overbanner2">
        {/*Tobpar*/}
        {/* <section className="theme-bg">
          <Container className="">
            <div>
              <ul className="font-poppins manu-font-one text-white d-flex justify-content-end align-items-center py-1">
                <li className="pe-3">
                  <a
                    className="text-light"
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    How to buy
                  </a>
                </li>
                <li className="pe-3">
                  <a
                    className="text-light"
                    href="/b2b"
                    target=""
                    rel="noopener noreferrer"
                  >
                    B2B
                  </a>
                </li>

                {reIsLoggedIn ? (
                  <Fragment>
                    <li className="pe-3 login-modal">
                      <Link href="/my-account" className="text-light">
                        My Account
                      </Link>
                    </li>
                    {customerType === "1" && (
                      <Fragment>
                        <li className="pe-3 login-modal">
                          <Link href="/vendor" className="text-light">
                            Vendor
                          </Link>
                        </li>
                        <li className="pe-3 login-modal">
                          <Link href="/preorder" className="text-light">
                            Pre-order
                          </Link>
                        </li>
                      </Fragment>
                    )}

                    <li className="">
                      <Link
                        href="/auth/logout"
                        className="text-light"
                        onClick={(e) => {
                          e.preventDefault();
                          logout();
                        }}
                      >
                        Logout
                      </Link>
                    </li>
                  </Fragment>
                ) : (
                  <Fragment>
                    <li className="pe-3 login-modal">
                      <Link href="/auth/login" className="text-light">
                        Sign In
                      </Link>
                    </li>
                    <li className="">
                      <Link href="/auth/register" className="text-light">
                        Sign Up
                      </Link>
                    </li>
                  </Fragment>
                )}
              </ul>
            </div>
          </Container>
        </section> */}

        {/*Logo and Search*/}
        <section className="theme-bg mobile_menu_hide">
          <Container>
            <div className="d-flex justify-content-between align-items-center main-manu-item py-3">
              <div className="">
                <Link href="/">
                  <Image
                    src={Logo}
                    alt="Picture of the author"
                    className="brand-logo"
                  />
                </Link>
              </div>
              <div className="header-form">
                <Form
                  action="/search"
                  method="get"
                  className="d-flex align-items-center justify-content-between form-item"
                >
                  <Form.Control
                    type="search"
                    name="keyword"
                    placeholder="Search..."
                    className="me-2 ps-4 rounded search-field border"
                    aria-label="Search"
                  />
                </Form>
              </div>

              <div className="d-flex">
                <div>
                  {reIsLoggedIn ? (
                    <Fragment>
                      <Link
                        href="/auth/logout"
                        onClick={(e) => {
                          e.preventDefault();
                          logout();
                        }}
                        className="manu-icon border-0 d-flex  mt-3 align-items-center"
                      >
                        <BiUser
                          size={"25px"}
                          className="text-white user_icon"
                        />
                        <div>
                          <p className="ps-2 text-light font-13">Logout</p>
                        </div>
                      </Link>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <div className="d-flex">
                        <Link
                          href="/auth/login"
                          className="manu-icon border-0 d-flex align-items-center mt-3 me-3"
                        >
                          <BiUser
                            size={"25px"}
                            className="text-white user_icon"
                          />
                          <p className="text-white text-capitalize ps-2 fw-light font-13">
                            sign in
                          </p>
                        </Link>

                        <Link
                          href="/auth/register"
                          className="manu-icon border-0 d-flex align-items-center mt-3 font-13"
                        >
                          <BiUser
                            size={"25px"}
                            className="text-white user_icon"
                          />
                          <p className="text-white text-capitalize ps-2 fw-light">
                            sign up
                          </p>
                        </Link>
                      </div>
                    </Fragment>
                  )}
                </div>

                <div className="cart_icon">
                  <CartOverlys />
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="menu_items_list">
          <Navbar expand="md">
            <Container>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto py-1 manu-font">
                  <Nav.Link
                    as={Link}
                    href="/"
                    className="d-flex align-items-center text-capitalize font-16 all-side-icons manu-font me-4 my-2 tab_screen_menu"
                  >
                    home
                  </Nav.Link>

                  <NavDropdown
                    className="p-0 me-auto rounded-0"
                    title={
                      <span className="font-inter py-3 text-capitalize font-16 d-flex align-items-center categories tab_screen_menu">
                        Caregories
                        <BiChevronDown size={"15px"} className="ms-2" />
                      </span>
                    }
                    id="navbarScrollingDropdown"
                  >
                    {/* <NavDropdown.Item className="m-0 p-0">
                      <Link
                        href={`/combo`}
                        className="cate-drop text-uppercase all-icons text-dark px-4 py-2 d-block font-inter"
                      >
                        Combo Pack
                      </Link>
                    </NavDropdown.Item> */}

                    {categories.map((category, key) => {
                      return (
                        <NavDropdown.Item key={key} href={`/category/${category.id}`} className="m-0 p-0">
                          <span
                            // href={`/category/${category.id}`}
                            className=" text-capitalize all-icons text-dark px-4 py-2 d-block font-inter tab_screen_menu"
                          >
                            {category.name}
                          </span>
                        </NavDropdown.Item>
                      );
                    })}
                  </NavDropdown>

                  <NavDropdown
                    className="p-0 px-4 me-auto rounded-0"
                    title={
                      <span className="font-inter py-3 d-flex align-items-center text-capitalize font-16 categories tab_screen_menu">
                        about us
                        <BiChevronDown size={"15px"} className="ms-2" />
                      </span>
                    }
                    id="navbarScrollingDropdown"
                  >
                    <NavDropdown.Item  href="/company-profile" className="m-0 p-0">
                      <span
                        className="cate-drop text-capitalize all-icons text-dark px-4 py-2 d-block font-inter tab_screen_menu"
                      >
                        Who we are
                      </span>
                    </NavDropdown.Item>
                  </NavDropdown>

                  <Nav.Link
                    as={Link}
                    href="/delivery-information"
                    className="d-flex align-items-center text-capitalize font-16 all-side-icons me-4 font-14 my-2 tab_screen_menu"
                  >
                    Delivery information
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    href="/contact"
                    className="d-flex align-items-center text-capitalize font-16 all-side-icons font-14 my-2 tab_screen_menu"
                  >
                    contacts
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>

              <div className="d-flex align-items-center">
                <div>
                  <ul className="manu-font-one d-flex justify-content-end align-items-center py-1">
                    {reIsLoggedIn ? (
                      <Fragment>
                        <li className="pe-3 login-modal">
                          <Link href="/my-account" className="font-16 tab_screen_menu">
                            My Account
                          </Link>
                        </li>
                        {customerType === "1" && (
                          <Fragment>
                            <li className="pe-3 login-modal">
                              <Link href="/vendor" className="font-16 text-capitalize tab_screen_menu">
                                in stock
                              </Link>
                            </li>
                            <li className="pe-3 login-modal">
                              <Link href="/pre_order" className="font-16 tab_screen_menu">
                                Pre-order
                              </Link>
                            </li>
                          </Fragment>
                        )}
                      </Fragment>
                    ) : (
                      ""
                    )}
                  </ul>
                </div>
              </div>
              {/* </div>  */}
            </Container>
          </Navbar>
        </section>

        {/* for responsive screen */}
        <section className="theme-bg overlay-div">
          <Navbar  expand="lg">
            <Container className="px-0" fluid>
              <div className="col-lg-3 col-md-3 me-0">
                <Link  href="/">
                  <img src="/logo/whitelogo.png" alt="" className="img-fluid mobile_res_logo"/>
                </Link>
              </div>
              <div className="col-lg-9">
                <div className="d-flex align-items-center">
                  <Overlay />
                  <CartOverlys />
                </div>
              </div>
            </Container>
          </Navbar>
        </section>
      </header>
    </Fragment>
  );
}
