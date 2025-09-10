"use client";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useCart } from "@/app/hooks/CartContext";
import { useState } from "react";

export default function CartDialog() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    selectedProductId,
    setSelectedProductId,
  } = useCart();

  // Lấy sản phẩm đang chọn từ giỏ hàng (mặc định 1 cái)
  const selectedItem =
    selectedProductId !== null
      ? cart.find((item) => item.id === selectedProductId)
      : null;

  // State tạm cho thuộc tính
  const [mau, setMau] = useState("Đen");
  const [size, setSize] = useState("M");
  const [soLuong, setSoLuong] = useState(1);

  const handleConfirm = () => {
    if (!selectedItem) return;

    // Xóa sản phẩm mặc định (nếu có) trước khi thêm bản chính thức
    removeFromCart(selectedItem.id);

    // Thêm sản phẩm với size/màu/SL đã chọn
    addToCart({
      ...selectedItem,
      mau,
      size,
      soLuong,
    });

    toast.success("Thêm vào giỏ hàng thành công", {
      style: {
        background: "black",
        color: "white",
      },
    });

    // Đóng dialog
    setIsCartOpen(false);
    setSelectedProductId(null);
  };

  return (
    <Dialog
      open={isCartOpen}
      onOpenChange={(open) => {
        setIsCartOpen(open);
        if (!open) setSelectedProductId(null);
      }}
    >
      <DialogContent className="max-w-lg ">
        <DialogHeader>
          <DialogTitle className="text-3xl flex justify-center">
            {"🛒 Giỏ hàng"}
          </DialogTitle>
        </DialogHeader>

        {!selectedItem ? (
          <p>Không có sản phẩm được chọn</p>
        ) : (
          <div className="grid grid-cols-2">
            <div>
              <Image
                src={selectedItem.hinhAnh}
                alt={selectedItem.tenSanPham}
                width={300}
                height={300}
                className="rounded object-cover"
              />
            </div>
            <div>
              <div>
                <p className="font-semibold">{selectedItem.tenSanPham}</p>
                <p className="text-red-500 font-medium">
                  {selectedItem.gia.toLocaleString()}đ
                </p>
              </div>
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
              <div>
                <p className="font-medium mb-2">Size</p>
                <div className="flex gap-2">
                  {["S", "M", "L", "XL"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`w-8 h-8 border rounded flex items-center justify-center ${
                        size === s ? "bg-black text-white" : "bg-white"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-medium mb-2">Số lượng</p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSoLuong(Math.max(1, soLuong - 1))}
                    className="w-6 h-6 border rounded"
                  >
                    -
                  </button>
                  <span className="px-4">{soLuong}</span>
                  <button
                    onClick={() => setSoLuong(soLuong + 1)}
                    className="w-6 h-6 border rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <DialogFooter className="col-span-full flex justify-center mt-9">
              <Button
                onClick={handleConfirm}
                className="w-full bg-black text-white hover:bg-gray-800"
              >
                Thêm vào giỏ hàng
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
