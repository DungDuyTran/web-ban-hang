"use client";

import { useCart } from "@/app/hooks/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const { cart, removeFromCart, updateCartItem } = useCart();

  const tongTien = cart.reduce((sum, item) => sum + item.gia * item.soLuong, 0);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-5xl font-bold mb-5 flex justify-center">GIỎ HÀNG</h1>

      {cart.length === 0 ? (
        <p>Giỏ hàng trống</p>
      ) : (
        <div className="grid grid-cols-3 gap-6 ">
          {/* Danh sách sản phẩm */}
          <div className="col-span-2 shadow-2xl ">
            {cart.map((item, index) => (
              <div key={index} className="flex items-center border-b py-4">
                <Image
                  src={item.hinhAnh}
                  alt={item.tenSanPham}
                  width={200}
                  height={200}
                  className="object-cover rounded"
                />

                <div className="ml-4 flex-1 space-y-2">
                  <p className="font-bold">{item.tenSanPham}</p>

                  {/* Màu */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Màu:</span>
                    {["Đen", "Trắng", "Đỏ"].map((m) => (
                      <button
                        key={m}
                        onClick={() => updateCartItem(item.id, { mau: m })}
                        className={`px-3 py-1 border rounded text-sm ${
                          item.mau === m ? "bg-black text-white" : "bg-white"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>

                  {/* Size */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Size:</span>
                    {["S", "M", "L", "XL"].map((s) => (
                      <button
                        key={s}
                        onClick={() => updateCartItem(item.id, { size: s })}
                        className={`w-9 h-9 border rounded flex items-center justify-center text-sm ${
                          item.size === s ? "bg-black text-white" : "bg-white"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>

                  {/* Số lượng */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        updateCartItem(item.id, {
                          soLuong: Math.max(1, item.soLuong - 1),
                        })
                      }
                      className="w-7 h-7 border rounded"
                    >
                      -
                    </button>
                    <span className="px-3">{item.soLuong}</span>
                    <button
                      onClick={() =>
                        updateCartItem(item.id, { soLuong: item.soLuong + 1 })
                      }
                      className="w-7 h-7 border rounded"
                    >
                      +
                    </button>
                  </div>

                  <p className="text-red-500 mt-1 font-medium">
                    {(item.gia * item.soLuong).toLocaleString()}đ
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 hover:bg-white hover:text-black mr-12 bg-black text-white w-[60px] h-auto border border-black shadow-2xl"
                >
                  Xóa
                </button>
              </div>
            ))}
          </div>

          {/* Tổng tiền */}
          <div className="border p-4 rounded-md shadow-2xl h-[220px]">
            <p className="font-bold text-lg mt-[20px]">
              Tổng tiền: {tongTien.toLocaleString()}đ
            </p>
            <button className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-white hover:text-black border border-black  ">
              Thanh toán
            </button>
            <div>
              <button
                onClick={() => router.push("/customer/trangchu")}
                className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-white hover:text-black border border-black"
              >
                Quay lại
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
