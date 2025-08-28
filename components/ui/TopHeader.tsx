"use client";
import React from "react";
import { useRouter } from "next/navigation";

const TopHeader = () => {
  const router = useRouter();
  return (
    <div>
      <div className="grid grid-col-[100px_100px_1fr] overflow-auto bg-white text-black z-50 w-screen text-xl shadow-2xl h-[70px] ">
        <div className="col-start-1 md:col-start-1  flex justify-center">
          <img src="/LOGO.png" alt="Logo" className="w-[200px] h-auto" />
        </div>
        <div className="col-start-2 md:col-start-2 gap-8  flex justify-center items-center font-mono">
          <div>SHOP</div>
          <div>DRAGON BALL Z</div>
          <div>COLLABS</div>
          <div>CONTACT</div>
          <div>ABOUT US</div>
          <div>BEST SELLER</div>
        </div>
        <div className="col-start-3 md:col-start-3 gap-4  flex justify-center items-center ">
          <button
            className="hover:bg-[rgb(187,139,90)] bg-[rgb(138,90,42)] w-[120px] h-[50px] rounded-xl text-white shadow"
            onClick={() => {
              router.push("/dangNhap");
            }}
          >
            Đăng Nhập
          </button>
          <button
            className="hover:bg-[rgb(187,139,90)] bg-[rgb(138,90,42)] w-[110px] h-[50px] rounded-xl text-white"
            onClick={() => {
              router.push("/dangKy");
            }}
          >
            Đăng Ký
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
