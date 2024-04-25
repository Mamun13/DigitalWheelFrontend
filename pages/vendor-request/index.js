import React, { Fragment, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "next/image";
import BtoBBanner from "public/b2b.jpg";
import axios from "axios";
import { makeTitle, tostify } from "../../utils/helpers";
import { toast } from "react-toastify";
import { API_URL } from "../../utils/constants";
import Head from "next/head";

const BToB = () => {
  const [formdata, setFormData] = useState({
    country_name: "",
    name: "",
    product_name: "",
    product_code: "",
    product_quantity: "",
    contact_number: "",
    email_address: "",
  });
  const [isVerified, setIsVerified] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!isVerified) {
    //     tostify(toast, 'error', {data: {message: 'reCaptcha submission failed'}});
    //     return;
    // }

    const data = {
      country_name: formdata.country_name,
      name: formdata.name,
      product_name: formdata.product_name,
      product_code: formdata.product_code,
      product_quantity: formdata.product_quantity,
      contact_number: formdata.contact_number,
      email_address: formdata.email_address,
    };

    try {
      await axios
        .post(`${API_URL}/ecom/send-b2b-sale-form`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          tostify(toast, "success", response);
        });

      setFormData({
        country_name: "",
        name: "",
        product_name: "",
        product_code: "",
        product_quantity: "",
        contact_number: "",
        email_address: "",
      });
    } catch (error) {
      tostify(toast, "warning", error);
    }
  };

  return (
    <Fragment>
      <Head>
        <title>Business 2 Business</title>
      </Head>
      <section>
        <div className="btob-banner positon-realtive">
          <Image src={BtoBBanner} alt="" className="btob-image" />
          <h1 className="text-center btob talk-business text-light font-48 font-jost fw-bold">
            Let&apos;s talk about business
          </h1>
        </div>
        <Container>
          <Row>
            <Col lg={12}>
              <div className="">
                <h2 className="text-center my-4 prosto_one_regular font-30 fw-bold text-secondary">
                  vendor
                </h2>
              </div>
            </Col>
            <Col lg={6} className="btob-forms">
            <div className="">
              <p className="float-left font-jost font-16 mb-4">
                Dear customers&apos; <br></br>Please fill out this B2B form if
                you have any inquiries on bulk order for your business from
                IFAD. Our responsible person will contact you as soon as
                possible on given contact detail.
              </p>
            </div>
              <div data-aos="fade-up">
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="">
                    <Form.Label className="text-capitalize">
                      first name
                      <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      name="country_name"
                      type="text"
                      placeholder="Enter country name"
                      value={formdata.country_name}
                      onChange={handleChange}
                      className="rounded-0 btob-input"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="">
                    <Form.Label className="text-capitalize">
                      last name
                      <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      name="country_name"
                      type="text"
                      placeholder="Enter country name"
                      value={formdata.country_name}
                      onChange={handleChange}
                      className="rounded-0 btob-input"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="">
                    <Form.Label>
                      NID<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      name="product_code"
                      type="number"
                      placeholder="Enter Product Code"
                      value={formdata.product_code}
                      onChange={handleChange}
                      className="rounded-0 btob-input mb-3"
                    />
                    <Form.Control type="file" multiple className="rounded-0" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="">
                    <Form.Label>
                      Retail shop/ Business name{" "}
                      <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      name="country_name"
                      type="text"
                      placeholder="Enter country name"
                      value={formdata.country_name}
                      onChange={handleChange}
                      className="rounded-0 btob-input"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="">
                    <Form.Label>
                      Business Location <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      name="name"
                      type="text"
                      placeholder="Enter name"
                      value={formdata.name}
                      onChange={handleChange}
                      className="rounded-0 btob-input"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="">
                    <Form.Label>
                      Type of Busines<span className="text-danger">*</span>
                    </Form.Label>
                    {/* <Form.Control
                      name="product_name"
                      type="text"
                      placeholder="Enter Product Name"
                      value={formdata.product_name}
                      onChange={handleChange}
                      className="rounded-0 btob-input"
                    /> */}
                    <Form.Select
                      aria-label="Default select example"
                      className="rounded-0 btob-input"
                    >
                      <option>Select menu</option>
                      <option value="Whole Seller">Whole Seller</option>
                      <option value="Retailer">Retailer</option>
                      <option value="Dristibutor">Dristibutor</option>
                      <option value="Importer">Importer</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="">
                    <Form.Label>
                      Tin<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      name="product_code"
                      type="number"
                      placeholder="Enter Product Code"
                      value={formdata.product_code}
                      onChange={handleChange}
                      className="rounded-0 btob-input"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="">
                    <Form.Label>
                      Bin / Trade License<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      name="product_code"
                      type="number"
                      placeholder="Enter Product Code"
                      value={formdata.product_code}
                      onChange={handleChange}
                      className="rounded-0 btob-input mb-3"
                    />
                    <Form.Control type="file" multiple className="rounded-0" />
                  </Form.Group>

                  {/* <Form.Group className="mb-3" controlId="">
                    <Form.Label>
                      Contact Number <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      name="contact_number"
                      type="number"
                      placeholder="Enter Contact Number"
                      value={formdata.contact_number}
                      onChange={handleChange}
                      className="rounded-0 btob-input"
                    />
                  </Form.Group> */}

                  {/* <Form.Group className="mb-3" controlId="">
                                    <ReCAPTCHA onVerify={setIsVerified} />
                                </Form.Group> */}

                  <Button
                    type="submit"
                    className="btob-submit-btn rounded-0 mb-4 text-dark font-jost font-poppins"
                  >
                    Submit
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export default BToB;
