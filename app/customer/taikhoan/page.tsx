"use client";
import React from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  return (
    <div className="w-screen flex justify-center items-center">
      <button
        onClick={() => router.push("/")}
        className="w-[100px] h-[50px] bg-black text-white hover:bg-white hover:text-black border border-black flex justify-center items-center"
      >
        Đăng xuất
      </button>
    </div>
  );
};

export default page;
