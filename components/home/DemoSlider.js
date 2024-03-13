import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Link from "next/link";

const DemoSlider = () => {
  return (
    <>
      <section className="hero_banner">
        <Carousel fade>
          <Carousel.Item>
            <div className=" position-relative slider_overlay">
              <img
                src="/banner/one.jpg"
                alt=""
                className="img-fluid hero_banner_img "
              />
            </div>
            <Carousel.Caption className="text-start slider_details w-50 d-flex align-items-center pb-0">
              <div className="">
                <h1 className="font-48 text-white pt-0 test_animation m-0 fw-bold slider_title pb-4">
                  Enjoy Our Delicious Meal
                </h1>
                <div className="test_des_animation">
                  <p className="text-light pb-4">
                    Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                    Aliqu diam amet diam et eos. Clita erat ipsum et lorem et
                    sit, sed stet lorem sit clita duo justo magna dolore erat
                    amet.
                  </p>
                </div>

                <div className="d-flex justify-content-start mt-3 btn_animation">
                  <Link href="#" className="button-48" role="button">
                    <span className="text text-uppercase">shop now</span>
                  </Link>
                </div>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div className=" position-relative slider_overlay">
              <img
                src="/banner/two.jpg"
                alt=""
                className="img-fluid hero_banner_img "
              />
            </div>
            <Carousel.Caption className="text-start slider_details w-50 d-flex align-items-center pb-0">
              <div className="">
                <h1 className="font-48 text-white pt-0 test_animation fw-bold m-0 slider_title pb-4">
                  Enjoy Our Delicious Meal
                </h1>
                <div className="test_des_animation">
                  <p className="text-light pb-4">
                    Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                    Aliqu diam amet diam et eos. Clita erat ipsum et lorem et
                    sit, sed stet lorem sit clita duo justo magna dolore erat
                    amet.
                  </p>
                </div>

                <div className="d-flex justify-content-start mt-3 btn_animation">
                  <Link href="#Reservation" className="button-48" role="button">
                    <span className="text text-uppercase">shop now</span>
                  </Link>
                </div>
              </div>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <div className=" position-relative slider_overlay">
              <img
                src="/banner/three.jpg"
                alt=""
                className="img-fluid hero_banner_img "
              />
            </div>
            <Carousel.Caption className="text-start slider_details w-50 d-flex align-items-center pb-0">
              <div className="">
                <h1 className="font-48 text-white pt-0 test_animation fw-bold m-0 slider_title pb-4">
                  Enjoy Our Delicious Meal
                </h1>
                <div className="test_des_animation">
                  <p className="text-light pb-4">
                    Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                    Aliqu diam amet diam et eos. Clita erat ipsum et lorem et
                    sit, sed stet lorem sit clita duo justo magna dolore erat
                    amet.
                  </p>
                </div>

                <div className="d-flex justify-content-start mt-3 btn_animation">
                  <Link href="#Reservation" className="button-48" role="button">
                    <span className="text text-uppercase">shop now</span>
                  </Link>
                </div>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>
    </>
  );
};

export default DemoSlider;
