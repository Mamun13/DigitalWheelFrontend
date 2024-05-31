import React, { Fragment, useEffect, useState } from "react";
import ScrollToTopButton from "../../components/common/ScrollToTopButton";
import Head from "next/head";

import Accordion from "react-bootstrap/Accordion";
import { Col, Container } from "react-bootstrap";

const CategoryPage = () => {
  return (
    <Fragment>
      <Head>
        <title>category | Digital Wheel</title>
      </Head>
      <section className="all_product_accordion">
        <div className="product-banner">
          <img
            src="/vendor.png"
            alt="category-image"
            className="product_category_banner"
          />
        </div>

        <Container>
          <h1 className="text-capitalize prosto_one_regular text-center font-32 fw-bold py-5">
            FAQs
          </h1>
          <div className="pb-4 accordion_focus">
            <Col lg={8} className="faq_content">
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Accordion Item #1</Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Accordion Item #2</Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </div>
        </Container>

        <ScrollToTopButton />
      </section>
    </Fragment>
  );
};

export default CategoryPage;
