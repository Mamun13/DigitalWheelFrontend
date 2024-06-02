import Link from "next/link";
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

const JoinVibe = () => {
  return (
    <>
      <section className="join_vabe">
        <Container>
          <Row>
            <Col lg={7}>
              <div className="d-flex justify-content-center align-items-center h-100">
                <div className="text-center">
                  <h2 className="text-light pb-3 font-40">
                    Discover Quick Order
                  </h2>
                  <p className="text-light font-16 mb-3">
                    adams vibe helps you buy the right products lightning fast!
                  </p>
                  <Link href="/auth/login">
                    <Button className="text-capitalize rounded-1 px-5 py-2 bg-primary">
                      join adams vabe
                    </Button>
                  </Link>
                </div>
              </div>
            </Col>
            <Col lg={5} className="bg-light">
                <h3 className="text-capitalize text-center font-24 py-3">get started</h3>
              <div className="text-center d-flex justify-content-center align-items-center my-3">
                <div>
                  <div className="text-center d-flex justify-content-center align-items-center">
                    <div className="join_img d-flex justify-content-center align-items-center">
                      <img
                        src="/register.png"
                        alt=""
                        className="join_img_one"
                      />
                    </div>
                  </div>
                  <p className="text-capitalize font-16 fw-semibold pb-2">
                    Register for an Account
                  </p>
                  <p className="text-capitalize font-16">
                    No purchase required.
                  </p>
                </div>
              </div>
              <div className="text-center d-flex justify-content-center align-items-center my-3">
                <div>
                  <div className="text-center d-flex justify-content-center align-items-center">
                    <div className="join_img d-flex justify-content-center align-items-center">
                      <img
                        src="/approvedit.png"
                        alt=""
                        className="join_img_one"
                      />
                    </div>
                  </div>
                  <p className="text-capitalize font-16 fw-semibold pb-2">
                    Get Approved
                  </p>
                  <p className="text-capitalize font-16">Simple and Fast.</p>
                </div>
              </div>
              <div className="text-center d-flex justify-content-center align-items-center my-3">
                <div>
                  <div className="text-center d-flex justify-content-center align-items-center">
                    <div className="join_img d-flex justify-content-center align-items-center">
                      <img src="/package.png" alt="" className="join_img_one" />
                    </div>
                  </div>
                  <p className="text-capitalize font-16 fw-semibold pb-2">
                    Start Ordering
                  </p>
                  <p className="text-capitalize font-16">
                    From a variety of products.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default JoinVibe;
