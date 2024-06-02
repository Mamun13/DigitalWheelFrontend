import React, { Fragment, useEffect, useState } from "react";
// Brands
import BrandSection from "../../components/home/BrandSection";
import ScrollToTopButton from "../../components/common/ScrollToTopButton";
import { fetchCategories } from "../../services/CategoryServices";
// import CategoryProductScroll from "../../components/home/CategoryProductScroll";
import CategoryShowcase from "../../components/home/CategoryShowcase";
import { fetchHomeBanners } from "../../services/CommonServices";
import AddBanner from "../../components/common/AddBanner";
import ComboProductScroll from "../../components/home/ComboProductScroll";
import { makeTitle } from "../../utils/helpers";
import Head from "next/head";
import DemoSlider from "../../components/home/DemoSlider";
import { fetchCombos } from "../../services/ComboServices";
// import NewArrival from "../../components/newArrival/NewArrival";
import NewArrivalProduct from "../../components/newArrivalProduct/NewArrivalProduct";
// import LatestTopProduct from "../../components/newArrivalProduct/LatestTopProduct";
import BrandsName from "../../components/all_band_name/BrandsName";
import FeaturedProduct from "../../components/featuredproduct/FeaturedProduct";
import DeliveryInformation from "../../components/home/DeliveryInformation";
import AddvertBanner from "../../components/home/AddvertBanner";
import CsvCart from "../../components/home/CsvCart";
import JoinVabe from "../../components/home/JoinVabe";
import BrandVideo from "../../components/home/BrandVideo";

const HomePage = () => {
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [combos, setCombos] = useState([]);

  useEffect(() => {
    fetchCombos({
      paginate: "no"
    }).then((response) => {
      if (response?.data) {
        setCombos(response.data);
      }
    });
  }, []);

  useEffect(() => {
    fetchCategories({
      paginate: "no"
    }).then((response) => {
      if (response?.data) {
        setCategories(response.data);
      }
    });
  }, []);

  // fetch
  useEffect(() => {
    fetchHomeBanners().then((response) => {
      if (response?.data) {
        setBanners(response.data[0]?.content_item);
      }
    });
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Home | Digital Wheel</title>
      </Head>
      <DemoSlider />
      {/* <vendorOver */}
      <FeaturedProduct />
      {combos > 0 ? <ComboProductScroll title="Combo Pack" /> : ""}
      <CategoryShowcase />
      <AddvertBanner/>
      <BrandsName />
      <NewArrivalProduct />
      {banners && banners.length > 1 && (
        <AddBanner imagePath={banners?.[1]?.item_image} />
      )}
      <BrandVideo/>
      <CsvCart/>
      <JoinVabe/>
      <BrandSection />
      <DeliveryInformation/>
      <ScrollToTopButton />
    </Fragment>
  );
};

export default HomePage;
