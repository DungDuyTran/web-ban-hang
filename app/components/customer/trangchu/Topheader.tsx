"use client";
import React from "react";
import { useRouter } from "next/navigation";
import TopMenu from "../../topmenu/page";
import { User, ShoppingCart, Bell } from "lucide-react";
const TopHeader = () => {
  const router = useRouter();
  return (
    <div>
      <div className="grid grid-col-[100px_100px_1fr] overflow-auto bg-white text-black z-50 w-screen text-xl shadow-2xl h-[70px] ">
        <div className="col-start-1 md:col-start-1  flex justify-center">
          <img
            onClick={() => router.push("/customer/trangchu")}
            src="/LOGO.png"
            alt="Logo"
            className="w-[200px] h-auto"
          />
        </div>
        <div className="col-start-2 md:col-start-2 gap-8  flex justify-center items-center font-mono">
          <TopMenu />
        </div>
        <div className="col-start-3 md:col-start-3 gap-5  flex justify-center items-center ">
          <button
            className="hover:text-amber-900"
            onClick={() => router.push("/customer/taikhoan")}
          >
            <User />
          </button>
          <button className="hover:text-amber-900">
            <Bell />
          </button>
          <button
            onClick={() => router.push("/customer/giohang")}
            className="hover:text-amber-900"
          >
            <ShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
