"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

export default function Carousel() {
  return (
    <div className="w-screen">
      <Swiper
        pagination={{ dynamicBullets: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        modules={[Pagination, Autoplay]}
        className=" shadow-lg"
      >
        {/* <SwiperSlide>
          <img
            src="/anh1.png"
            alt="Slide 1"
            className="w-full h-auto object-cover "
          />
        </SwiperSlide> */}
        <SwiperSlide>
          <img
            src="/anh2.webp"
            alt="Slide 2"
            className="w-full h-auto object-cover "
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/anh3.webp"
            alt="Slide 3"
            className="w-full h-auto object-cover "
          />
        </SwiperSlide>
        {/* <SwiperSlide>
          <img
            src="/anh4.jpg"
            alt="Slide 4"
            className="w-full h-auto object-cover "
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/anh5.jpg"
            alt="Slide 5"
            className="w-full h-auto object-cover "
          />
        </SwiperSlide> */}
      </Swiper>
    </div>
  );
}
