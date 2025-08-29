import React from "react";

const Product2 = () => {
  return (
    <div className="bg-white ">
      <div className="grid grid-cols-[1.6fr_1.6fr_0.2fr_1.0fr_1.0fr] grid-rows-5 gap-4 h-[1100px] bg-black">
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
        <div className="col-span-5 row-start-5 bg-white h-[270px]">
          <h3 className="text-black font-[courier] flex justify-center items-center text-4xl mt-3">
            Thương hiệu
          </h3>
          <div className="grid grid-cols-4 ml-[140px] mt-[30px]">
            <div>
              <img
                src="/anh5.png"
                alt="anh"
                className="w-[140px] flex justify-center items-center"
              />
              <h4 className="text-black font-bold text-xs ml-[20px] mt-[16px] ">
                /EMBLEM LOGO/
              </h4>
            </div>
            <div>
              <img
                src="/anh11.png"
                alt="anh"
                className="w-[140px] flex justify-center items-center"
              />
              <h4 className="text-black font-bold text-xs ml-[20px] ">
                /SIGNATURE Y/
              </h4>
            </div>
            <div>
              <img
                src="/anh12.png"
                alt="anh"
                className="w-[200px] flex justify-center items-center"
              />{" "}
              <h4 className="text-black font-bold text-xs ml-[50px] mt-[34px]">
                /DICO COMFY LOGO/
              </h4>
            </div>
            <div>
              <img
                src="/anh13.png"
                alt="anh"
                className="w-[200px] flex justify-center items-center"
              />
              <h4 className="text-black font-bold text-xs ml-[20px] mt-[26px]">
                /DICO START LOGO/
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product2;
