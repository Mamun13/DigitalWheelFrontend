import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaUserCircle, FaUser } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Image from "next/image";
import Logo from "../../public/logo/LOGO.png";
import { BiChevronDown } from "react-icons/bi";
import { CiViewList } from "react-icons/ci";

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
      paginate: "no",
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

  // useEffect(() => {
  //   if (isLoggedIn()) {
  //     setReIsLoggedIn(isLoggedIn());
  //     const responseData = JSON.parse(localStorage.getItem("responseData")); // Fetch response data from localStorage
  //     if (responseData?.data?.customer?.customer_type === "1") {
  //       setCustomerType(1);
  //     }
  //   }
  // }, []);

  return (
    <Fragment>
      <header className="overbanner2">
        {/*Tobpar*/}
        <section className="theme-bg">
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
        </section>

        {/*Logo and Search*/}

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
                  className="me-2 ps-4 rounded-pill search-field border"
                  aria-label="Search"
                />
              </Form>
            </div>
            <div className="cart_icon">
              <CartOverlys />
            </div>
            {/* <div className="">
              <div className="d-flex justify-content-between align-items-center">
                {storedToken && (
                    <Fragment>
                      <DropdownButton
                        id="dropdown-basic-button"
                        className="user-icon border-end"
                        title={
                          <span className="manu-icon border-0">
                            <FaUserCircle size={"25px"} />
                          </span>
                        }
                      >
                        <Dropdown.Item className="logoutBtn">
                          <Link
                            href="/my-account"
                            className="d-flex align-items-center profile-btn text-capitalize"
                          >
                            <CiUser className="font-16 me-1" />
                            <span className="font-16">account</span>
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item className="logoutBtn">
                          <Link
                            href="/"
                            className="d-flex align-items-center profile-btn text-capitalize"
                          >
                            <MdOutlineLogout className="font-16 me-1" />
                            <span
                              className="font-16"
                              onClick={(e) => {
                                e.preventDefault();
                                logout();
                              }}
                            >
                              logout
                            </span>
                          </Link>
                        </Dropdown.Item>
                      </DropdownButton>
                    </Fragment>
                  )}
               

                
              </div>
            </div> */}
          </div>
        </Container>

        <section className="bg-dark py-2">
          <Navbar bg="dark" expand="md">
            <Container>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto  manu-font">
                  <Nav.Link
                    as={Link}
                    href="/"
                    className="d-flex align-items-center all-side-icons manu-font me-4 my-2"
                  >
                    home
                  </Nav.Link>

                  <NavDropdown
                    className="p-0 me-auto rounded-0"
                    title={
                      <span className="text-white font-inter  py-3 d-flex align-items-center categories">
                        CATEGORIES
                        <BiChevronDown size={"15px"} className="ms-2" />
                      </span>
                    }
                    id="navbarScrollingDropdown"
                  >
                    <NavDropdown.Item className="m-0 p-0">
                      <Link
                        href={`/combo`}
                        className="cate-drop text-uppercase all-icons text-dark px-4 py-2 d-block font-inter"
                      >
                        Combo Pack
                      </Link>
                    </NavDropdown.Item>

                    {categories.map((category, key) => {
                      return (
                        <NavDropdown.Item key={key} className="m-0 p-0">
                          <Link
                            href={`/category/${category.id}`}
                            className="cate-drop text-uppercase all-icons text-dark px-4 py-2 d-block font-inter"
                          >
                            {category.name}
                          </Link>
                        </NavDropdown.Item>
                      );
                    })}
                  </NavDropdown>

                  <NavDropdown
                    className="p-0 px-4 me-auto rounded-0"
                    title={
                      <span className="text-white font-inter  py-3 d-flex align-items-center categories">
                        about us
                        <BiChevronDown size={"15px"} className="ms-2" />
                      </span>
                    }
                    id="navbarScrollingDropdown"
                  >
                    <NavDropdown.Item className="m-0 p-0">
                      <Link
                        href="/company-profile"
                        className="cate-drop text-uppercase all-icons text-dark px-4 py-2 d-block font-inter"
                      >
                        Who we are
                      </Link>
                    </NavDropdown.Item>
                  </NavDropdown>

                  {/* <NavDropdown
                    className="p-0 rounded-0 about-btn"
                    title={
                      <span className="text-white font-inter px-4 py-3 d-flex align-items-center categories">
                        about us <BiChevronDown className="ms-1" />
                      </span>
                    }
                    id="navbarScrollingDropdown"
                  >
                    <NavDropdown.Item className="text-capitalize all-icons text-dark d-block">
                      <Link
                        href="/company-profile"
                        className="cate-drop text-uppercase all-icons text-dark d-block font-inter"
                      >
                        Who we are
                      </Link>
                    </NavDropdown.Item>
                    {/* <NavDropdown.Item className="text-capitalize all-icons text-dark px-4 py-2 d-block">
                      <Link href="/board-of-directors" className="cate-drop">
                        BOD & Leadership
                      </Link>
                    </NavDropdown.Item> 
                  </NavDropdown> */}

                  <Nav.Link
                    as={Link}
                    href="/delivery-information"
                    className="d-flex align-items-center all-side-icons me-4 font-14 my-2"
                  >
                    DELIVERY INFORMATION
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    href="/contact"
                    className="d-flex align-items-center all-side-icons font-14 my-2"
                  >
                    contacts
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>

              {/* <div className="d-flex align-items-center cart_icon_bg me-0">
                <div className="me-3 d-flex align-items-center bg-light px-3 py-2 rounded-pill">
                  <AiOutlineUser className="me-2" color="" size={"20px"} />
                  <div className="d-flex align-items-center">
                    <Link href="/auth/login">Login / </Link>
                    <Link href="/auth/register"> Register</Link>
                  </div>
                </div>*/}
              <div className="d-flex align-items-center">
                <div className="me-2">
                  <CiViewList color="white" size={"50px"} />
                </div>
                <div>
                  <p className="text-light text-capitalize">contact</p>
                  <p className="text-light text-capitalize">000111223344</p>
                </div>
              </div>
              {/* </div>  */}
            </Container>
          </Navbar>
        </section>

        {/* for responsive screen */}
        {/* <section className="bg-dark btn-hover overlay-div">
          <Navbar bg="dark" expand="lg">
            <Container className="px-0" fluid>
              <div className="col-lg-3 col-md-3 me-0" href="#">
                <NavDropdown
                  className="p-0 me-auto rounded-0 w-100"
                  title={
                    <span className="text-white font-inter px-4 py-3 d-flex align-items-center categories">
                      <BiAlignLeft size={"15px"} className="me-2" />
                      CATEGORIES
                    </span>
                  }
                  id="navbarScrollingDropdown"
                >
                  <NavDropdown.Item className="text-capitalize all-icons text-dark px-4 py-2 d-block font-inter">
                    <Link href={`/combo`} className="cate-drop">
                      Combo Pack
                    </Link>
                  </NavDropdown.Item>

                  {categories.map((category, key) => {
                    return (
                      <NavDropdown.Item
                        key={key}
                        className="text-capitalize all-icons text-dark px-4 py-2 d-block font-inter"
                      >
                        <Link
                          href={`/category/${category.id}`}
                          className="cate-drop"
                        >
                          {category.name}
                        </Link>
                      </NavDropdown.Item>
                    );
                  })}
                </NavDropdown>
              </div>
              <div className="col-lg-9" href="#">
                <Overlay />
              </div>
            </Container>
          </Navbar>
        </section> */}
      </header>
    </Fragment>
  );
}
