import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const AddvertBanner = () => {
  return (
    <>
        <section className='add_section mb-4'>
            <Container fluid>
                <Row>
                    <Col lg={4}>
                        <div className='elementor-widget-container'>
                            <div className='bwp-policy default style1 p-3'>
                               <div className='d-flex '>
                                    <div className='add_image_div position-relative'>
                                        <img src='/add/1.png' alt='' className='position-absolute addvert_image'/>
                                    </div>
                                    <div className='add_text py-3'>
                                        <p className='text-uppercase prosto_one_regular text-light font-20'>best e liquid</p>
                                        <p className='text-uppercase font-mont font-12 text-light'>Best E liquids from our huge collection</p>
                                    </div>
                               </div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className='elementor-widget-container'>
                            <div className='second_add style1 p-3'>
                               <div className='d-flex '>
                                    <div className='add_image_div position-relative'>
                                        <img src='/add/2.png' alt='' className='position-absolute addvert_image2'/>
                                    </div>
                                    <div className='add_text py-3'>
                                        <p className='text-uppercase prosto_one_regular text-light font-20'>best vabe tanks</p>
                                        <p className='text-uppercase font-mont font-12 text-light'>Find the perfect tank for you from some of best</p>
                                    </div>
                               </div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className='elementor-widget-container'>
                            <div className='third_add style1 p-3'>
                               <div className='d-flex '>
                                    <div className='add_image_div position-relative'>
                                        <img src='/add/3.png' alt='' className='position-absolute addvert_image3'/>
                                    </div>
                                    <div className='add_text py-3'>
                                        <p className='text-uppercase prosto_one_regular text-light font-20'>best vab kits</p>
                                        <p className='text-uppercase font-mont font-12 text-light'>Find the perfect tank for you from some of best</p>
                                    </div>
                               </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    </>
  )
}

export default AddvertBanner