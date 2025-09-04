"use client";
import React from "react";
import { useRouter } from "next/navigation";
import TopMenu from "../../topmenu/page";
const TopHeader = () => {
  const router = useRouter();
  return (
    <div>
      <div className="grid grid-col-[100px_100px_1fr] overflow-auto bg-white text-black z-50 w-screen text-xl shadow-2xl h-[70px] ">
        <div className="col-start-1 md:col-start-1  flex justify-center">
          <img src="/LOGO.png" alt="Logo" className="w-[200px] h-auto" />
        </div>
        <div className="col-start-2 md:col-start-2 gap-8  flex justify-center items-center font-mono">
          <TopMenu />
        </div>
        <div className="col-start-3 md:col-start-3 gap-2  flex justify-center items-center ">
          <button
            className=" w-[100px] h-[40px] rounded-xl text-amber-900 font-mono shadow hover:bg-amber-900 hover:text-white"
            onClick={() => {
              router.push("/");
            }}
          >
            LOG OUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
