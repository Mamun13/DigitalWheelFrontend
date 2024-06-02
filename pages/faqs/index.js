import React, { Fragment, useEffect, useState } from "react";
import ScrollToTopButton from "../../components/common/ScrollToTopButton";
import Head from "next/head";
import { fetchfaqs } from "../../services/FaqsService";
import Accordion from "react-bootstrap/Accordion";
import { Col, Container } from "react-bootstrap";
import parse from 'html-react-parser'

const CategoryPage = () => {
  const [faqs, setFaqs] = useState([]);
  // fetch

  useEffect(() => {
    fetchfaqs().then((response) => {
      if (response?.data) {
        setFaqs(response.data[0]?.content_item);
      }
    });
  }, []);

  console.log(faqs);
  const defaultActiveKey = faqs.length > 0 ? 0 : null;
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
              <Accordion defaultActiveKey={defaultActiveKey}>
                {faqs.map((faqdata, index) => {
                  return (
                    <>
                      <Accordion.Item eventKey={index} key={index}>
                        <Accordion.Header>{faqdata.item_name || ""}</Accordion.Header>
                        <Accordion.Body>
                          {parse(faqdata.item_long_desc || "")}
                        </Accordion.Body>
                      </Accordion.Item>
                    </>
                  );
                })}
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
