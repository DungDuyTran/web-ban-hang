"use client";

import { useCart } from "@/app/hooks/CartContext";
import Image from "next/image";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  const tongTien = cart.reduce((sum, item) => sum + item.gia * item.soLuong, 0);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-5">GIỎ HÀNG</h1>

      {cart.length === 0 ? (
        <p>Giỏ hàng trống</p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {/* Danh sách sản phẩm */}
          <div className="col-span-2">
            {cart.map((item, index) => (
              <div key={index} className="flex items-center border-b py-4">
                {/* Ảnh sản phẩm */}
                <Image
                  src={item.hinhAnh}
                  alt={item.tenSanPham}
                  width={80}
                  height={80}
                  className="object-cover rounded"
                />

                <div className="ml-4 flex-1">
                  <p className="font-bold">{item.tenSanPham}</p>
                  <p>
                    Màu: {item.mau} | Size: {item.size}
                  </p>

                  {/* Số lượng */}
                  <p className="mt-2">Số lượng: {item.soLuong}</p>

                  {/* Giá tiền */}
                  <p className="text-red-500 mt-1">
                    {(item.gia * item.soLuong).toLocaleString()}đ
                  </p>
                </div>

                {/* Nút xóa */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 ml-4 hover:underline"
                >
                  Xóa
                </button>
              </div>
            ))}
          </div>

          {/* Tổng tiền */}
          <div className="border p-4 rounded-md shadow">
            <p className="font-bold text-lg">
              Tổng tiền: {tongTien.toLocaleString()}đ
            </p>
            <button className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800">
              Thanh toán
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
