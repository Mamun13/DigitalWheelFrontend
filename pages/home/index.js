import React, { Fragment, useEffect, useState } from "react";
import BannerSection from "../../components/home/BannerSection";
// Brands
import BrandSection from "../../components/home/BrandSection";
import ScrollToTopButton from "../../components/common/ScrollToTopButton";
import { fetchCategories } from "../../services/CategoryServices";
import CategoryProductScroll from "../../components/home/CategoryProductScroll";
import CategoryShowcase from "../../components/home/CategoryShowcase";
// import FeatureSection from "../../components/home/FeatureSection";
import { fetchHomeBanners } from "../../services/CommonServices";
import AddBanner from "../../components/common/AddBanner";
import ComboProductScroll from "../../components/home/ComboProductScroll";
// import DiscountedProductScroll from "../../components/home/DiscountedProductScroll";
import { makeTitle } from "../../utils/helpers";
import Head from "next/head";
import DemoSlider from "../../components/home/DemoSlider";
import { fetchCombos } from "../../services/ComboServices";
import NewArrival from "../../components/newArrival/NewArrival";

const HomePage = () => {
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [combos, setCombos] = useState([]);

  useEffect(() => {
    fetchCombos({
      paginate: "no",
    }).then((response) => {
      if (response?.data) {
        setCombos(response.data);
      }
    });
  }, []);

  useEffect(() => {
    fetchCategories({
      paginate: "no",
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

      {/* <BannerSection/> */}
      <DemoSlider />

      {combos > 0 ? <ComboProductScroll title="Combo Pack" /> : ""}

      <CategoryShowcase />

      {/* <DiscountedProductScroll
				title="Discounted Product"
			/> */}

      {banners && banners.length && (
        <AddBanner imagePath={banners?.[0]?.item_image} />
      )}
      
      {/* {categories.map((category, key) => {
        return (
          <CategoryProductScroll
            key={key}
            title={category.name}
            categoryId={category.id}
          />
        );
      })} */}
      <NewArrival/>

      {banners && banners.length > 1 && (
        <AddBanner imagePath={banners?.[1]?.item_image} />
      )}

      <BrandSection />
      {/* <FeatureSection /> */}

      <ScrollToTopButton />
    </Fragment>
  );
};

export default HomePage;
