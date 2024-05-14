import { useRef, Fragment, useEffect, useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import Link from "next/link";
import NavDropdown from "react-bootstrap/NavDropdown";
import { BiChevronDown } from "react-icons/bi";
import { fetchCategories } from "../../services/CategoryServices";

function Overlay() {
  const [categories, setCategories] = useState([]);
  const [storedToken, setStoredToken] = useState();

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
          <AiOutlineBars className="font-30 overlay-icon me-4" />
        </button>
      </div>

      <div ref={overlayRef} className="overlay">
        <button className="close-button" onClick={closeSearch}>
          &times;
        </button>
        <div className="overlay-content text-uppercase font-24 fw-semibold">
          <ul className="lh-lg font-20 text-start ps-4">
            <li >
              <Link
                href="/"
                onClick={closeSearch}
                className="overlay-content-itema"
              >
                home
              </Link>
            </li>
            <li>
                <NavDropdown
                    className="p-0 me-auto rounded-0"
                    title={
                      <span className="font-inter overlay-content-itema text-capitalize font-16 d-flex align-items-center categories tab_screen_menu">
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
                        <NavDropdown.Item key={key} className="m-0 p-0">
                          <Link
                            href={`/category/${category.id}`}
                            className="text-capitalize all-icons text-dark px-4 py-2 d-block font-inter tab_screen_menu"
                          >
                            {category.name}
                          </Link>
                        </NavDropdown.Item>
                      );
                    })}
                  </NavDropdown>
            </li>
            <li>
              <NavDropdown
                className="p-0 me-auto rounded-0"
                title={
                  <span className="font-inter overlay-content-itema d-flex align-items-center text-capitalize font-16 categories tab_screen_menu">
                    about us
                    <BiChevronDown size={"15px"} className="ms-2" />
                  </span>
                }
                id="navbarScrollingDropdown"
              >
                <NavDropdown.Item className="m-0 p-0">
                  <Link
                    href="/company-profile"
                    className="cate-drop text-capitalize all-icons text-dark px-4 py-2 d-block font-inter tab_screen_menu"
                  >
                    Who we are
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </li>
            <li>
              <Link
                href="/delivery-information"
                onClick={closeSearch}
                className="overlay-content-itema"
              >
                delivery information
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                onClick={closeSearch}
                className="overlay-content-itema"
              >
                contacts
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
}

export default Overlay;
