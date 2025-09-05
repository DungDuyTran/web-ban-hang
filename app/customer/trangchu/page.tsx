import React from "react";
import TopHeader from "@/app/components/customer/trangchu/Topheader";
import Carousel from "@/app/components/customer/trangchu/Carousel";
import ProductCus from "@/app/components/customer/trangchu/Product";
import Demo from "@/app/components/customer/trangchu/Demo";
import Footer from "@/app/components/customer/trangchu/Footer";
const TrangChu = () => {
  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-50">
        <TopHeader />
      </div>

      <Carousel />
      <ProductCus />
      <Demo />
      <Footer />
    </div>
  );
};

export default TrangChu;
