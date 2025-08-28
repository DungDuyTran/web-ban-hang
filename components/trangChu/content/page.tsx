import React from "react";
import TopHeader from "@/components/ui/TopHeader";
import Carousel from "@/components/ui/Carousel";
import ProductPage from "@/components/ui/product";
const Content = () => {
  return (
    <div>
      <TopHeader />
      <div>
        <Carousel />
      </div>
      <div>
        <ProductPage />
      </div>
    </div>
  );
};

export default Content;
