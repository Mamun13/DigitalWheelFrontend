import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Link from "next/link";

const BrandVideo = () => {
  return (
    <>
      <section className="brand_video pt-2">
        <Container>
          <Row>
            <Col lg={6}>
              <div className="d-flex align-items-center h-100">
                <div className="text-center">
                  <h2 className="text-light pb-3 font-40">
                    RAZ TN9000 DISPOSABLE
                  </h2>
                  <p className="text-light font-16 mb-3">
                    The world's first mega HD screen disposable. Choose
                    convenience without compromise with Raz TN9000.
                  </p>
                  <Link href="/bulk_in_stock">
                    <Button className="text-capitalize rounded-1 px-5 py-2 bg-primary">
                      bulk in stock
                    </Button>
                  </Link>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="mb-3">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/WiB9Ycrh0qM?si=MaDkrI63YQewI4aR"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default BrandVideo;
