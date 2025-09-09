"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Product } from "@/types";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/hooks/CartContext";

export default function ProductDetail() {
  const params = useParams();
  const id = params?.id;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { addToCart, setIsCartOpen } = useCart();

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch("/api/sanpham");
        const data = await res.json();
        const found = data.find((p: any) => p.id === Number(id));
        if (found) {
          setProduct({
            ...found,
            giaGoc: Number(found.giaGoc),
            giaKhuyenMai: found.giaKhuyenMai
              ? Number(found.giaKhuyenMai)
              : undefined,
          });
        }
      } catch (error) {
        console.error("Lỗi khi load sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return <p className="text-black">Đang tải thông tin sản phẩm...</p>;
  if (!product) return <p className="text-red-500">Không tìm thấy sản phẩm</p>;

  return (
    <div className="p-6 bg-white text-black max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ảnh */}
        <div className="relative w-full h-130">
          <Image
            src={product.HinhAnh?.hinhAnh || "/no-image.png"}
            alt={product.tenSanPham}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* Thông tin */}
        <div>
          <h2 className="text-3xl font-bold mb-3">{product.tenSanPham}</h2>
          <p className="text-gray-600 mb-4">{product.moTa}</p>

          <div className="mb-4">
            {product.giaKhuyenMai ? (
              <div>
                <span className="text-2xl font-bold text-red-500 mr-3">
                  {product.giaKhuyenMai.toLocaleString()}đ
                </span>
                <span className="line-through text-gray-400">
                  {product.giaGoc.toLocaleString()}đ
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold text-gray-800">
                {product.giaGoc.toLocaleString()}đ
              </span>
            )}
          </div>

          <p>
            <span className="font-semibold">Số lượng còn:</span>{" "}
            {product.soLuongTon}
          </p>
          <p>
            <span className="font-semibold">Trạng thái:</span>{" "}
            <span className="text-green-600">{product.trangThai}</span>
          </p>

          <p>
            <span className="font-semibold">Danh mục:</span>{" "}
            {product.DanhMuc?.tenDanhMuc}
          </p>
          <p>
            <span className="font-semibold">Thương hiệu:</span>{" "}
            {product.ThuongHieu?.tenThuongHieu}
          </p>

          <button
            onClick={() => {
              if (!product) return;
              const cartItem = {
                id: product.id,
                tenSanPham: product.tenSanPham,
                gia: product.giaKhuyenMai ?? product.giaGoc,
                hinhAnh: product.HinhAnh?.hinhAnh || "/no-image.png",
                soLuong: 1,
              };
              addToCart(cartItem);
              setIsCartOpen(true); // 👈 mở dialog
            }}
            className="mt-5 px-5 py-2 bg-white text-black hover:bg-black hover:text-white mr-5 border border-black"
          >
            Thêm vào giỏ hàng
          </button>

          <button className="mt-5 px-5 py-2  bg-black hover:bg-white text-white hover:text-black border border-black   ">
            Mua ngay
          </button>
          <br />
          <button
            onClick={() => router.push("/customer/trangchu")}
            className="bg-white text-black border border-black mt-5 w-[100px] h-[45px] hover:text-white hover:bg-black"
          >
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );
}
