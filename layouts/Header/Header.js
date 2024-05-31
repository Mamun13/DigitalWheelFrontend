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
import Logo from "../../public/logo/vabe.png";
import { BiChevronDown } from "react-icons/bi";
import { BiAlignLeft } from "react-icons/bi";

import CartOverlys from "./CartOverlay";
import { fetchCategories } from "../../services/CategoryServices";
import { isLoggedIn, logout } from "../../utils/auth";
import { useRouter } from "next/router";
import Overlay from "./Overlay";
import { IoIosSearch } from "react-icons/io";
// import {
//   fetchCategory
// } from "../services/CategoryServices";

export default function Header() {
  const router = useRouter();
  const { keyword } = router.query;
  const [storedToken, setStoredToken] = useState();
  const [storeLocal, setStoreLocal] = useState();
  const [categories, setCategories] = useState([]);
  const [reIsLoggedIn, setReIsLoggedIn] = useState(false);
  const [customerType, setCustomerType] = useState(null);
  const [drop, setDrop] = useState("dropdown_items");

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

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  // const [category, setCategory] = useState({});
  const [inventories, setInventories] = useState([]);
  const [filteredInventory, setFilteredinventory] = useState([]);

  // fetch
  useEffect(() => {
    fetchCategories({
      paginate: "no",
    }).then((response) => {
      if (response?.data) {
        setCategories(response.data);
      }
    });
  }, []);

  const [tab, setTab] = useState("");

  const handleTabChange = (t) => {
    setTab(t);
  };

  const fetchInventoriesByCategoryData = (id, params = {}) => {
    fetchInventoriesByCategory(id, params).then((response) => {
      // if (response?.data?.data) { // if paginate: "yes"
      //     setInventories(response.data.data);
      //     setMeta(response.data.meta);
      // }
      if (response?.data) {
        // if paginate: "no"
        setInventories(response.data);
        setFilteredinventory(response.data);
      }
    });
  };

  const itemfilter = (id) => {
    const items = inventories.filter((i) => i.product.sub_category?.id === id);
    setFilteredinventory(items);
  };

  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Fragment>
      <header className="overbanner2">
        {/*Logo and Search*/}
        <section className="bg-light mobile_menu_hide">
          <Container>
            <div className="d-flex justify-content-between align-items-center main-manu-item pb-0">
              <div className="header-form header_width">
                {/* <Form
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
                </Form> */}
              </div>

              <div className="d-flex header_width">
                <div>
                  {reIsLoggedIn ? (
                    <Fragment>
                      <div className="d-flex align-items-center">
                        <div className="d-flex align-items-center">
                          {isVisible && (
                            <Form
                              action="/search"
                              method="get"
                              className="mt-2"
                            >
                              <Form.Control
                                type="search"
                                name="keyword"
                                placeholder="Search..."
                                className="rounded border search_btn"
                                aria-label="Search"
                              />
                            </Form>
                          )}

                          <button
                            className="mt-1 px-2"
                            onClick={toggleVisibility}
                          >
                            <IoIosSearch size={"25px"} className=" user_icon" />
                          </button>
                        </div>

                        <div>
                          <NavDropdown
                            className="me-auto rounded-0"
                            title={
                              <span className="font-inter py-3 text-capitalize font-16 d-flex align-items-center categories tab_screen_menu">
                                <BiUser size={"25px"} className=" user_icon" />
                              </span>
                            }
                            id="navbarScrollingDropdown"
                          >
                            <NavDropdown.Item
                              href="/my-account"
                              className="font-14 px-0 py-0"
                            >
                              <span className=" text-capitalize all-icons text-dark ps-3 py-2 d-block font-inter tab_screen_menu">
                                My Account
                              </span>
                            </NavDropdown.Item>
                            {customerType === "1" && (
                              <>
                                <NavDropdown.Item
                                  href="/vendor"
                                  className="font-14 px-0 py-0"
                                >
                                  <span className=" text-capitalize all-icons text-dark ps-3 py-2 d-block font-inter tab_screen_menu">
                                    in stock
                                  </span>
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                  href="/pre_order"
                                  className="font-14 px-0 py-0"
                                >
                                  <span className=" text-capitalize all-icons text-dark ps-3 py-2 d-block font-inter tab_screen_menu">
                                    Pre-order
                                  </span>
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                  href="/#"
                                  className="font-14 px-0 py-0"
                                >
                                  <span className=" text-capitalize all-icons text-dark ps-3 py-2 d-block font-inter tab_screen_menu">
                                  sell products
                                  </span>
                                </NavDropdown.Item>
                              </>
                            )}

                            <NavDropdown.Item
                              href="/auth/logout"
                              onClick={(e) => {
                                e.preventDefault();
                                logout();
                              }}
                              className="font-14 px-0 py-0"
                            >
                              <span className=" text-capitalize all-icons text-dark ps-3 py-2 d-block font-inter tab_screen_menu">
                                Logout
                              </span>
                            </NavDropdown.Item>
                          </NavDropdown>
                        </div>
                      </div>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <div className="d-flex">
                        <div className="d-flex align-items-center">
                          {isVisible && (
                            <Form
                              action="/search"
                              method="get"
                              className="mt-2"
                            >
                              <Form.Control
                                type="search"
                                name="keyword"
                                placeholder="Search..."
                                className="rounded border search_btn"
                                aria-label="Search"
                              />
                            </Form>
                          )}

                          <button
                            className=" mt-2 px-2"
                            onClick={toggleVisibility}
                          >
                            <IoIosSearch
                              size={"25px"}
                              className="mt-2 user_icon"
                            />
                          </button>
                        </div>
                        <Link
                          href="/auth/login"
                          className="manu-icon border-0 d-flex align-items-center mt-3  "
                        >
                          <BiUser size={"25px"} className=" user_icon" />
                        </Link>

                        {/* <Link
                          href="/auth/register"
                          className="manu-icon border-0 d-flex align-items-center mt-3 font-13"
                        >
                          <BiUser size={"25px"} className="user_icon" />
                          <p className="text-capitalize ps-2 fw-light">
                            sign up
                          </p>
                        </Link> */}
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
        {/*Logo and Search*/}
        <section className="bg-light mobile_menu_hide">
          <Container>
            <div className="d-flex justify-content-center align-items-center main-manu-item pb-2">
              <Link href="/">
                <Image
                  src={Logo}
                  alt="Picture of the author"
                  className="brand-logo pb-0"
                />
              </Link>
            </div>
          </Container>
        </section>

        <section className="menu_items_list">
          <Navbar expand="md">
            <Container>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mx-auto py-1 manu-font">
                  {categories?.map((item, index) => {
                    return (
                      <>
                        <NavDropdown
                          key={index}
                          className="px-3 me-auto rounded-0"
                          title={
                            <span className="font-inter py-3 text-capitalize font-16 d-flex align-items-center categories tab_screen_menu">
                              {item.name}
                              <BiChevronDown size={"15px"} className="ms-1" />
                            </span>
                          }
                          id="navbarScrollingDropdown"
                        >
                          {item?.sub_categories &&
                            item.sub_categories.map((sub_items, index) => (
                              <NavDropdown.Item
                                key={index}
                                href={`/category/${item.id}`}
                                className="m-0 p-0"
                              >
                                <span className=" text-capitalize all-icons text-dark px-4 py-2 d-block font-inter tab_screen_menu">
                                  <button
                                    onClick={(e) => itemfilter(sub_items.id)}
                                  >
                                    {sub_items?.name}
                                  </button>
                                </span>
                              </NavDropdown.Item>
                            ))}
                        </NavDropdown>
                      </>
                    );
                  })}
                </Nav>
              </Navbar.Collapse>

              {/* <div className="d-flex align-items-center">
                <div>
                  <ul className="manu-font-one d-flex justify-content-end align-items-center py-1">
                    {reIsLoggedIn ? (
                      <Fragment>
                        <li className="pe-3 login-modal">
                          <Link
                            href="/my-account"
                            className="font-16 tab_screen_menu"
                          >
                            My Account
                          </Link>
                        </li>
                        {customerType === "1" && (
                          <Fragment>
                            <li className="pe-3 login-modal">
                              <Link
                                href="/vendor"
                                className="font-16 text-capitalize tab_screen_menu"
                              >
                                in stock
                              </Link>
                            </li>
                            <li className="pe-3 login-modal">
                              <Link
                                href="/pre_order"
                                className="font-16 tab_screen_menu"
                              >
                                Pre-order
                              </Link>
                            </li>
                            <li className="pe-3 login-modal">
                              <Link
                                href="/#"
                                className="font-16 text-capitalize tab_screen_menu"
                              >
                                sell products
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
              </div> */}
              {/* </div>  */}
            </Container>
          </Navbar>
        </section>

        {/* for responsive screen */}
        <section className="theme-bg overlay-div">
          <Navbar expand="lg">
            <Container className="px-0" fluid>
              <div className="col-lg-3 col-md-3 me-0">
                <Link href="/">
                  <img
                    src="/logo/vabe.png"
                    alt=""
                    className="img-fluid mobile_res_logo"
                  />
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
