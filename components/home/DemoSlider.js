import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { fetchBanners } from "../../services/BannerServices";
import { getStoragePath } from "../../utils/helpers";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";

const DemoSlider = () => {
  const [banners, setBanners] = useState([]);

  // fetch
  useEffect(() => {
    fetchBanners().then((response) => {
      if (response?.data) {
        setBanners(response.data?.[0]?.content_item);
      }
    });
  }, []);

  return (
    <>
      <section className="hero_banner">
        {/* <Container> */}
        <Row>
          <Col lg={6} className="p-0">
            <Carousel fade>
              {banners &&
                banners.map((banner, key) => (
                  <Carousel.Item key={key}>
                    <div className=" position-relative slider_overlay">
                      <img
                        src={getStoragePath(banner.item_image)}
                        alt=""
                        className="img-fluid hero_banner_img "
                      />
                    </div>
                    <Carousel.Caption className="text-start slider_details w-50 d-flex align-items-center pb-0">
                      <div className="">
                        <h1 className="font-48 text-capitalize text-white pt-0 test_animation fw-bold m-0 slider_title pb-4">
                          find everything for vabing
                        </h1>
                        <div className="test_des_animation">
                          <p className="text-light pb-4">
                            Sell globally in minutes with localized currencies
                            languages, and experie in every market. only a
                            variety of vaping products
                          </p>
                        </div>

                        <div className="d-flex justify-content-start mt-3 btn_animation">
                          <Link
                            href="#Reservation"
                            className="button-48"
                            role="button"
                          >
                            <span className="text text-uppercase">
                              shop now
                            </span>
                          </Link>
                        </div>
                      </div>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
            </Carousel>
          </Col>
          <Col lg={3} className="pe-0">
            <Carousel fade>
              {banners &&
                banners.map((banner, key) => (
                  <Carousel.Item key={key}>
                    <div className=" position-relative slider_overlay">
                      <img
                        src={getStoragePath(banner.item_image)}
                        alt=""
                        className="img-fluid hero_banner_img "
                      />
                    </div>
                    <Carousel.Caption className="">
                      <div className="">find everything for vabing</div>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
            </Carousel>
          </Col>
          <Col lg={3} className="pe-0">
            <div className="h-50 mb-2">
              <Carousel fade>
                {banners &&
                  banners.map((banner, key) => (
                    <Carousel.Item key={key}>
                      <div className=" position-relative slider_overlay">
                        <img
                          src={getStoragePath(banner.item_image)}
                          alt=""
                          className="img-fluid hero_banner_img h-50"
                        />
                      </div>
                      <Carousel.Caption className="">sdasdsa</Carousel.Caption>
                    </Carousel.Item>
                  ))}
              </Carousel>
            </div>
            <div className="h-50">
              <Carousel fade>
                {banners &&
                  banners.map((banner, key) => (
                    <Carousel.Item key={key}>
                      <div className=" position-relative slider_overlay">
                        <img
                          src={getStoragePath(banner.item_image)}
                          alt=""
                          className="img-fluid hero_banner_img h-50"
                        />
                      </div>
                      <Carousel.Caption className="">sdasdsa</Carousel.Caption>
                    </Carousel.Item>
                  ))}
              </Carousel>
            </div>
          </Col>
        </Row>

        {/* </Container> */}
      </section>
    </>
  );
};

export default DemoSlider;
