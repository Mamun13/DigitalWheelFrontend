import { useRef, Fragment, useEffect, useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import Link from "next/link";
import NavDropdown from "react-bootstrap/NavDropdown";
import { BiChevronDown } from "react-icons/bi";
import { fetchCategories } from "../../services/CategoryServices";
import Accordion from 'react-bootstrap/Accordion';
import { isLoggedIn, logout } from "../../utils/auth";
import { useRouter } from "next/router";


function Overlay() {
  const [categories, setCategories] = useState([]);
  const [storedToken, setStoredToken] = useState();
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

  const overlayRef = useRef();

  const openSearch = () => {
    overlayRef.current.style.width = "100%";
  };

  const closeSearch = () => {
    overlayRef.current.style.width = "0%";
  };

  return (
    <Fragment>
      <div className="main">
        <button onClick={openSearch} className="open-button">
          <AiOutlineBars className="font-30 overlay-icon me-3" />
        </button>
      </div>

      <div ref={overlayRef} className="overlay">
        <button className="close-button" onClick={closeSearch}>
          &times;
        </button>
        <div className="overlay-content text-uppercase font-24 fw-semibold">
          <ul className="lh-lg font-20 text-start px-5">
            <li onClick={closeSearch}>
              <Link
                href="/"
                
                className="overlay-content-itema"
              >
                home
              </Link>
            </li>
            <li className="mb-3">
              <Accordion>
                <Accordion.Item eventKey="0" className="rounded-bottom">
                  <Accordion.Header>Categories</Accordion.Header>
                  <Accordion.Body>
                    {categories.map((category, key) => {
                      return (
                        <NavDropdown.Item as={Link} href={`/category/${category.id}`} onClick={closeSearch} key={key} className="m-0 p-0">
                          <span
                            className="text-capitalize all-icons text-dark px-4 py-2 d-block font-inter tab_screen_menu"
                          >
                            {category.name}
                          </span>
                        </NavDropdown.Item>
                      );
                    })}
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1" className="mt-3 rounded-top">
                  <Accordion.Header>About us</Accordion.Header>
                  <Accordion.Body>
                    <Link
                      href="/company-profile"
                      onClick={closeSearch}
                      className="cate-drop text-capitalize all-icons text-dark px-4 py-2 d-block font-inter tab_screen_menu"
                    >
                      Who we are
                    </Link>
                  </Accordion.Body>
                </Accordion.Item>

              </Accordion>
            </li>
            
            <li onClick={closeSearch}>
              <Link
                href="/delivery-information"
                
                className="overlay-content-itema"
              >
                delivery information
              </Link>
            </li>
            <li onClick={closeSearch}>
              <Link
                href="/contact"
                
                className="overlay-content-itema"
              >
                contacts
              </Link>
            </li>
            {reIsLoggedIn ? (
              <>
                <li className="pe-3 login-modal" onClick={closeSearch}>
                  <Link href="/my-account" className="overlay-content-itema">
                    My Account
                  </Link>
                </li>
                {customerType === "1" && (
                  <Fragment>
                    <li className="pe-3 login-modal" onClick={closeSearch}>
                      <Link onClick={closeSearch} href="/vendor" className="overlay-content-itema">
                        in stock
                      </Link>
                    </li>
                    <li className="pe-3 login-modal" onClick={closeSearch}>
                      <Link onClick={closeSearch} href="/pre_order" className="overlay-content-itema">
                        Pre-order
                      </Link>
                    </li>
                    <li className="pe-3 login-modal" onClick={closeSearch}>
                      <Link onClick={closeSearch} href="#" className="overlay-content-itema">
                        Sell Products
                      </Link>
                    </li>
                  </Fragment>
                )}
                <li onClick={closeSearch} >
                  <Link
                    href="/auth/logout"
                    onClick={(e) => {
                      e.preventDefault();
                      logout();
                    }}
                    className="overlay-content-itema"
                  >
                    log out
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li onClick={closeSearch}>
                  <Link
                    href="/auth/login"
                    
                    className="overlay-content-itema"
                  >
                    sign in
                  </Link>
                </li>
                <li onClick={closeSearch}>
                  <Link
                    href="/auth/register"
                    className="overlay-content-itema"
                  >
                    sign up
                  </Link>
                </li>
              </>
            )}


          </ul>
        </div>
      </div>
    </Fragment>
  );
}

export default Overlay;
