import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Link from "next/link";

const CsvCart = () => {
  return (
    <>
      <section className="csv_cart">
        <Container>
          <Row>
            <Col lg={6}>
              <div>
                <img
                  src="./csv-cart.png"
                  alt="csv cart"
                  className="img-fluid csv-cta-wrapper-img my-3"
                />
              </div>
            </Col>
            <Col lg={6}>
              <div className="d-flex align-items-center h-100">
                <div className="text-center">
                  <h2 className="text-light pb-3 font-40">
                    Utilize Multiple Ordering Options
                  </h2>
                  <p className="text-light font-16 mb-3">
                    Seamlessly integrate our CSV upload feature to swiftly add
                    products to your cart in just a few clicks.
                  </p>
                  <Link href="/bulk_in_stock">
                    <Button className="text-capitalize rounded-1 px-5 py-2 bg-primary">
                      bulk in stock
                    </Button>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default CsvCart;
