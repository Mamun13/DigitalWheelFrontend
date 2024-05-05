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
    first_name: "",
    last_name: "",
    contact_number: "",
    email_address: "",
    nid_number: "",
    nid_upload: "",
    business_name: "",
    business_location: "",
    type_of_business: "",
    tin_number: "",
    bin_number: "",
    doc_upload: ""
  });
  const [isVerified, setIsVerified] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!isVerified) {
    //     tostify(toast, 'error', {data: {message: 'reCaptcha submission failed'}});
    //     return;
    // }

    const data = {
      first_name: formdata.first_name,
      last_name: formdata.last_name,
      contact_number: formdata.contact_number,
      email_address: formdata.email_address,
      nid_number: formdata.nid_number,
      nid_upload: formdata.nid_upload,
      business_name: formdata.business_name,
      business_location: formdata.business_location,
      type_of_business: formdata.type_of_business,
      tin_number: formdata.tin_number,
      bin_number: formdata.bin_number,
      doc_upload: formdata.doc_upload
    };

    try {
      await axios
        .post(`${API_URL}/ecom/send-b2b-sale-form`, data, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then((response) => {
          tostify(toast, "success", response);
        });

      setFormData({
        first_name: "",
        last_name: "",
        contact_number: "",
        email_address: "",
        nid_number: "",
        nid_upload: "",
        business_name: "",
        business_location: "",
        type_of_business: "",
        tin_number: "",
        bin_number: "",
        doc_upload: ""
      });
    } catch (error) {
      tostify(toast, "warning", error);
    }
  };
  console.log(formdata);
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
                <h2 className="text-center text-capitalize my-4 prosto_one_regular font-30 fw-bold text-secondary">
                  Vendor
                </h2>
              </div>
            </Col>
            <Col lg={6} className="btob-forms">
              <div className="">
                <p className="float-left font-jost font-16 mb-4">
                  Dear customers&apos; <br></br>Please fill out this vendor
                  request form if you have any inquiries on bulk order for your
                  business from Adams Vibe. Our responsible person will contact
                  you as soon as possible on given contact detail.
                </p>
              </div>
              <div data-aos="fade-up">
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col lg={6}>
                      <Form.Group className="mb-3" controlId="">
                        <Form.Label className="text-capitalize">
                          first name
                          <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          name="first_name"
                          type="text"
                          placeholder="Enter country name"
                          value={formdata.first_name}
                          onChange={handleChange}
                          className="rounded-0 btob-input"
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={6}>
                      <Form.Group className="mb-3" controlId="">
                        <Form.Label className="text-capitalize">
                          last name
                          <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          name="last_name"
                          type="text"
                          placeholder="Enter last name"
                          value={formdata.last_name}
                          onChange={handleChange}
                          className="rounded-0 btob-input"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3" controlId="">
                    <Form.Label className="text-capitalize">
                      contact number
                      <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      name="contact_number"
                      type="text"
                      placeholder="Enter country name"
                      value={formdata.contact_number}
                      onChange={handleChange}
                      className="rounded-0 btob-input"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="">
                    <Form.Label className="text-capitalize">
                      email address
                      <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      name="email_address"
                      type="email"
                      placeholder="Enter country name"
                      value={formdata.email_address}
                      onChange={handleChange}
                      className="rounded-0 btob-input"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="">
                    <Form.Label>
                      NID<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      name="nid_number"
                      type="number"
                      placeholder="Enter Product Code"
                      value={formdata.nid_number}
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
                      name="business_name"
                      type="text"
                      placeholder="Enter business name"
                      value={formdata.business_name}
                      onChange={handleChange}
                      className="rounded-0 btob-input"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="">
                    <Form.Label>
                      Business Location <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      name="business_location"
                      type="text"
                      placeholder="Enter business location"
                      value={formdata.business_location}
                      onChange={handleChange}
                      className="rounded-0 btob-input"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="">
                    <Form.Label>
                      Type of Busines<span className="text-danger">*</span>
                    </Form.Label>
                    
                    <Form.Select
                      name="type_of_business"
                      aria-label="Default select example"
                      className="rounded-0 btob-input"
                      value={formdata.type_of_business}
                      onChange={handleChange}
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
                      name="tin_number"
                      type="number"
                      placeholder="Enter Product Code"
                      value={formdata.tin_number}
                      onChange={handleChange}
                      className="rounded-0 btob-input"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="">
                    <Form.Label>
                      Bin / Trade License<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      name="bin_number"
                      type="number"
                      placeholder="Enter Product Code"
                      value={formdata.bin_number}
                      onChange={handleChange}
                      className="rounded-0 btob-input mb-3"
                    />
                    <Form.Control type="file" multiple className="rounded-0" />
                  </Form.Group>
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
