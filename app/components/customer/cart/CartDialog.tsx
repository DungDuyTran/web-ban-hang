"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useCart } from "@/app/hooks/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CartDialog() {
  const { cart, isCartOpen, setIsCartOpen, addToCart, removeFromCart } =
    useCart();
  const router = useRouter();

  // State chọn sản phẩm khi thêm
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [mau, setMau] = useState("Đen");
  const [size, setSize] = useState("M");
  const [soLuong, setSoLuong] = useState(1);

  const tongTien = cart.reduce((sum, item) => sum + item.gia * item.soLuong, 0);

  // Hàm mở dialog cho sản phẩm mới
  const openForProduct = (product: any) => {
    setSelectedProduct(product);
    setIsCartOpen(true);
    setMau("Đen");
    setSize("M");
    setSoLuong(1);
  };

  const handleAdd = () => {
    if (!selectedProduct) return;
    addToCart({
      id: selectedProduct.id,
      tenSanPham: selectedProduct.tenSanPham,
      gia: selectedProduct.giaKhuyenMai || selectedProduct.giaGoc,
      hinhAnh: selectedProduct.HinhAnh?.hinhAnh || "/no-image.png",
      soLuong,
      mau,
      size,
    });
    setSelectedProduct(null); // reset về chế độ giỏ hàng
  };

  return (
    <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {selectedProduct ? "Chọn thuộc tính sản phẩm" : "🛒 Giỏ hàng"}
          </DialogTitle>
        </DialogHeader>

        {/* Nếu đang chọn sản phẩm thì hiển thị form chọn */}
        {selectedProduct ? (
          <div className="space-y-4">
            {/* Chọn màu */}
            <div>
              <p className="font-medium mb-2">Màu</p>
              <div className="flex gap-2">
                {["Đen", "Trắng", "Đỏ"].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMau(m)}
                    className={`px-4 py-2 border rounded ${
                      mau === m ? "bg-black text-white" : "bg-white"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Chọn size */}
            <div>
              <p className="font-medium mb-2">Size</p>
              <div className="flex gap-2">
                {["S", "M", "L", "XL"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`w-10 h-10 border rounded flex items-center justify-center ${
                      size === s ? "bg-black text-white" : "bg-white"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Chọn số lượng */}
            <div>
              <p className="font-medium mb-2">Số lượng</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSoLuong(Math.max(1, soLuong - 1))}
                  className="w-8 h-8 border rounded"
                >
                  -
                </button>
                <span className="px-4">{soLuong}</span>
                <button
                  onClick={() => setSoLuong(soLuong + 1)}
                  className="w-8 h-8 border rounded"
                >
                  +
                </button>
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  onClick={handleAdd}
                  className="bg-black text-white hover:bg-white hover:text-black border border-black w-full"
                >
                  Xác nhận
                </Button>
              </DialogClose>
            </DialogFooter>
          </div>
        ) : (
          // ✅ Hiển thị giỏ hàng
          <>
            {cart.length === 0 ? (
              <p>Giỏ hàng trống</p>
            ) : (
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 border-b pb-3"
                  >
                    {/* Ảnh sản phẩm */}
                    <Image
                      src={item.hinhAnh}
                      alt={item.tenSanPham}
                      width={100} // ✅ có thể chỉnh w/h
                      height={100}
                      className="rounded object-cover"
                    />

                    <div className="flex-1 space-y-2">
                      <p className="font-semibold">{item.tenSanPham}</p>

                      {/* Chọn màu */}
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Màu:</span>
                        {["Đen", "Trắng", "Đỏ"].map((m) => (
                          <button
                            key={m}
                            className={`px-3 py-1 border rounded text-sm ${
                              item.mau === m
                                ? "bg-black text-white"
                                : "bg-white"
                            }`}
                          >
                            {m}
                          </button>
                        ))}
                      </div>

                      {/* Chọn size */}
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Size:</span>
                        {["S", "M", "L", "XL"].map((s) => (
                          <button
                            key={s}
                            className={`w-9 h-9 border rounded flex items-center justify-center text-sm ${
                              item.size === s
                                ? "bg-black text-white"
                                : "bg-white"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>

                      {/* Số lượng */}
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Số lượng:</span>
                        <button className="w-8 h-8 border rounded">-</button>
                        <span className="px-3">{item.soLuong}</span>
                        <button className="w-8 h-8 border rounded">+</button>
                      </div>

                      {/* Giá tiền */}
                      <p className="text-red-500 font-medium">
                        {(item.gia * item.soLuong).toLocaleString()}đ
                      </p>
                    </div>

                    {/* Nút xóa */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Xóa
                    </button>
                  </div>
                ))}

                <p className="font-bold">Tổng: {tongTien.toLocaleString()}đ</p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    router.push("/customer/giohang");
                  }}
                  className="w-full bg-black text-white py-2 rounded"
                >
                  Thanh toán
                </button>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
