import React from "react";
import TopHeader from "@/components/ui/TopHeader";
import Carousel from "@/components/ui/Carousel";
import ProductPage from "@/components/ui/product";
import Product2 from "@/components/ui/product2";
const Content = () => {
  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-50 ">
        <TopHeader />
      </div>

      <div className="mt-[70px]">
        <Carousel />
      </div>
      <div>
        <ProductPage />
      </div>
      <div>
        <Product2 />
      </div>
    </div>
  );
};

export default Content;
