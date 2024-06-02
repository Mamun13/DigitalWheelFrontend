import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import NavDropdown from "react-bootstrap/NavDropdown";
import { BiUser } from "react-icons/bi";
import Image from "next/image";
// import Logo from "../../public/logo/LOGO.png";
import Logo from "../../public/logo/vabe.png";
import { BiChevronDown } from "react-icons/bi";

import CartOverlys from "./CartOverlay";
import { fetchCategories } from "../../services/CategoryServices";
import { isLoggedIn, logout } from "../../utils/auth";
import { useRouter } from "next/router";
import Overlay from "./Overlay";
import { IoIosSearch } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";
import { IoAirplaneSharp } from "react-icons/io5";
import CloseButton from "react-bootstrap/CloseButton";

export default function Header() {
  const router = useRouter();
  const { keyword } = router.query;
  const [storedToken, setStoredToken] = useState();
  const [storeLocal, setStoreLocal] = useState();
  const [categories, setCategories] = useState([]);
  const [reIsLoggedIn, setReIsLoggedIn] = useState(false);
  const [customerType, setCustomerType] = useState(null);
  const [inventories, setInventories] = useState([]);
  const [filteredInventory, setFilteredinventory] = useState([]);

  const [drop, setDrop] = useState("dropdown_items");

  const [showItems, setShowItems] = useState(null);
  const [dropdow, setDropdow] = useState("dropdownbtn");

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

  const fetchInventoriesByCategoryData = (id, params = {}) => {
    fetchInventoriesByCategory(id, params).then((response) => {
      if (response?.data?.data) {
        // if paginate: "yes"
        setInventories(response.data.data);
        setMeta(response.data.meta);
      }
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

  const handleMouseEnter = (index) => {
    setShowItems(index);
    setDrop(drop);
  };

  const handleMouseLeave = () => {
    setShowItems(null);
  };

  const handleClickService = () => {
    setShowItems(false);
    // router.push("/");
  };
  const [tab, setTab] = useState("");

  const handleTabChange = (t) => {
    setTab(t);
  };

  return (
    <Fragment>
      <header className="overbanner2">
        {/*Logo and Search*/}
        <section className="bg-light mobile_menu_hide">
          <div className="d-flex justify-content-center align-items-center pt-2">
            <IoAirplaneSharp />
            <div>
              <h1 className="text-center ps-2 fw-semibold">
                Free shipping on orders of $100+ ! delivery only Dhaka
              </h1>
            </div>
          </div>
          <Container>
            <div className="d-flex justify-content-between align-items-center main-manu-item pb-0">
              <div className="d-flex align-items-center">
                <MdLocationPin />
                <div>
                  <p className="font-16 ps-2 text-capitalize">
                    Now shopping{" "}
                    <span className="fw-bold theme-color ">online</span>
                  </p>
                </div>
              </div>

              <div className="d-flex header_width">
                <div>
                  {reIsLoggedIn ? (
                    <Fragment>
                      <div className="d-flex align-items-center">
                        <div className="">
                          {isVisible && (
                            <div className="position-relative">
                              <div className="just_form">
                                <Form
                                  action="/search"
                                  method="get"
                                  className="mt-2 "
                                >
                                  <Form.Control
                                    type="search"
                                    name="keyword"
                                    placeholder="Search..."
                                    className="rounded border search_btn"
                                    aria-label="Search"
                                  />
                                </Form>
                              </div>

                              <button
                                type="button"
                                className="formclose_btn"
                                aria-label="Close"
                                onClick={toggleVisibility}
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                          )}

                          <button
                            className="mt-1 px-2"
                            onClick={toggleVisibility}
                          >
                            <IoIosSearch size={"26px"} className=" user_icon" />
                          </button>
                        </div>

                        <div>
                          <NavDropdown
                            className="me-auto rounded-0"
                            title={
                              <span className="font-inter py-3 text-capitalize font-16 d-flex align-items-center categories tab_screen_menu">
                                <BiUser size={"25px"} className=" user_icon" />
                                <BiChevronDown size={"15px"} className="ms-1" />
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
                      <div className="d-flex mt-2">
                        <div className="">
                          {isVisible && (
                            <div className="position-relative">
                              <div className="just_form">
                                <Form
                                  action="/search"
                                  method="get"
                                  className="mt-2 "
                                >
                                  <Form.Control
                                    type="search"
                                    name="keyword"
                                    placeholder="Search..."
                                    className="rounded border search_btn"
                                    aria-label="Search"
                                  />
                                </Form>
                              </div>

                              <button
                                type="button"
                                className="formclose_btn"
                                aria-label="Close"
                                onClick={toggleVisibility}
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                          )}

                          <button
                            className="mt-1 px-2"
                            onClick={toggleVisibility}
                          >
                            <IoIosSearch size={"26px"} className=" user_icon" />
                          </button>
                        </div>
                        <Link
                          href="/auth/login"
                          className="manu-icon border-0 d-flex align-items-center"
                        >
                          <BiUser size={"25px"} className=" user_icon" />
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

        <section className="menu_items_list bg-light">
          <Navbar expand="md">
            <Container>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mx-auto py-1 manu-font">
                {reIsLoggedIn ? (
                  <>
                      {customerType === "1" ? (
                        <>
                     <Link
                     href="/vendor"
                     className={`font-inter py-3 text-capitalize font-16 px-2 ${
                       tab === "Wholesale" ? "active_menu" : ""
                     }`}
                     onClick={() => {
                       handleTabChange('Wholesale');
                     }}
                   >
                     Wholesale
                   </Link>
                   <Link
                     href="/pre_order"
                     className={`font-inter py-3 text-capitalize font-16 px-2 ${
                       tab === "pre-order" ? "active_menu" : ""
                     }`}
                     onClick={() => {
                       handleTabChange('pre-order');
                     }}
                   >
                     pre-order
                   </Link>
                   <Link
                     href="/vendor-request"
                     className={`font-inter py-3 text-capitalize font-16 px-2 ${
                       tab === "Wholeasale" ? "active_menu" : ""
                     }`}
                     onClick={() => {
                       handleTabChange('Wholeasale');
                     }}
                   >
                     Become A Wholeasale
                   </Link>
                   <Link
                     href="/bulk_in_stock"
                     className={`font-inter py-3 text-capitalize font-16 px-2 ${
                       tab === "bulk" ? "active_menu" : ""
                     }`}
                     onClick={() => {
                       handleTabChange('bulk');
                     }}
                   >
                     Bulk In Stock
                   </Link>
                   </>
                  ) : (
                    ""
                  )}
                 
                </>
                ) : (<>
                  {categories?.map((item, index) => {
                    return (
                      <>
                        <NavDropdown
                          key={index}
                          className={`px-3 me-auto rounded-0 ${
                            tab === index ? "active_menu" : ""
                          }`}
                          title={
                            <Link
                              href={`/category/${item.id}`}
                              className="font-inter py-3 text-capitalize font-16 d-flex align-items-center categories tab_screen_menu"
                            >
                              {item.name}
                              <BiChevronDown
                                size={"15px"}
                                className="ms-1"
                              />
                            </Link>
                          }
                          id="navbarScrollingDropdown"
                          onMouseEnter={() => handleMouseEnter(index)}
                          onMouseLeave={() => handleMouseLeave()}
                          // onClick={() => handleClickService()}
                          onClick={() => {
                            // handleClickService();
                            handleTabChange(index);
                          }}
                          show={showItems === index}
                        >
                          {item?.sub_categories ? (
                            <>
                              {item?.sub_categories &&
                                item.sub_categories.map(
                                  (sub_items, index) => (
                                    <NavDropdown.Item
                                      key={index}
                                      className="m-0 p-0 border-0"
                                    >
                                      <span className=" text-capitalize all-icons text-dark px-4 py-2 d-block font-inter tab_screen_menu">
                                        <button
                                          onClick={(e) =>
                                            itemfilter(sub_items.id)
                                          }
                                        >
                                          {sub_items?.name}
                                        </button>
                                      </span>
                                    </NavDropdown.Item>
                                  )
                                )}
                            </>
                          ) : (
                            false
                          )}
                        </NavDropdown>
                      </>
                    );
                  })}
                </>)}
                </Nav>
              </Navbar.Collapse>
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
