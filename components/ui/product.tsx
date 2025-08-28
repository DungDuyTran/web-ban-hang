"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "@/types/product"; // 👈 dùng lại interface

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/sanpham"); // API của bạn
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Lỗi khi load sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center mt-10">Đang tải sản phẩm...</p>;

  return (
    <div className="container mx-auto p-6 bg-white text-black w-screen">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Danh sách sản phẩm
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 shadow  ">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col"
          >
            {/* Hình ảnh */}
            <div className="w-full h-48 relative mb-4 text-2xl">
              <Image
                src={
                  product?.hinhAnhId
                    ? `/images/${product.hinhAnhId}.jpg`
                    : "/no-image.png"
                }
                alt={product.tenSanPham}
                fill
                className="object-cover rounded"
              />
            </div>

            {/* Tên + giá */}

            <div className="mt-2 text-xl flex justify-center">
              {product.giaKhuyenMai ? (
                <div>
                  <span className="text-red-500 font-bold mr-2">
                    {product.giaKhuyenMai.toLocaleString()}₫
                  </span>
                  <span className="line-through text-gray-400">
                    {product.giaGoc.toLocaleString()}₫
                  </span>
                </div>
              ) : (
                <span className="text-gray-800 font-bold">
                  {product.giaGoc.toLocaleString()}₫
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
