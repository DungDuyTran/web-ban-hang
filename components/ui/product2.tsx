import React from "react";

const Product2 = () => {
  return (
    <div className="grid grid-cols-[1.6fr_1.6fr_0.2fr_1.0fr_1.0fr] grid-rows-5 gap-4 h-[1100px]">
      {/* Cột 1-2 rộng hơn */}
      <div className="col-span-2">
        <img
          src="/anh6.webp"
          alt="anh1"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Box 3 */}
      <div className="col-start-4 row-start-4">
        <img
          src="/anh5.webp"
          alt="anh3"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Box 4 */}
      <div className="col-start-5 row-start-4">
        <img
          src="/anh5.png"
          alt="anh4"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Box 5 */}
      <div className="col-span-2 row-span-2 col-start-1 row-start-2">
        <img
          src="/anh1.webp"
          alt="anh5"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Box 6 */}
      <div className="col-span-2 row-span-3 col-start-4 row-start-1">
        <img
          src="/anh9.webp"
          alt="anh6"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="row-span-4 col-start-3 row-start-1 bg-white flex items-center justify-center"></div>

      <div className="col-span-2 col-start-1 row-start-4">
        <img
          src="/anh8.jpeg"
          alt="anh6"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Product2;
