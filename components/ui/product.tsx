"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "@/types/product";

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/sanpham");
        const data = await res.json();

        const mapped = data.map((p: any) => ({
          ...p,
          giaGoc: Number(p.giaGoc),
          giaKhuyenMai: p.giaKhuyenMai ? Number(p.giaKhuyenMai) : undefined,
          hinhAnhUrl: p.HinhAnh?.hinhAnh || "/no-image.png",
        }));

        setProducts(mapped);
      } catch (error) {
        console.error("Lỗi khi load sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center mt-10">Đang tải sản phẩm...</p>;

  // Tính toán phân trang
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="p-6 bg-white text-black w-screen ">
      <h1 className="text-4xl mb-6 text-center font-[courier] font-bold ">
        Danh sách sản phẩm
      </h1>

      {/* Grid sản phẩm */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ml-[50px] mr-[50px]">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="hover:shadow-lg shadow-xl transition p-4 flex flex-col"
          >
            <div className="w-full h-48 relative mb-4">
              <Image
                src={product.hinhAnhUrl || "/no-image.png"}
                alt={product.tenSanPham}
                fill
                unoptimized
                className="object-cover"
              />
            </div>

            <h2 className="text-lg font-semibold text-center">
              {product.tenSanPham}
            </h2>

            <div className=" mt-2 text-xl flex justify-center">
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

      {/* Pagination */}
      {/* Pagination */}
      <div className="flex justify-end mr-[150px] mt-8 space-x-2">
        {/* Prev */}
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-lg border border-gray-300  text-lg
               hover:bg-gray-100 transition disabled:opacity-50"
        >
          «
        </button>

        {/* Pages */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded-lg border transition text-lg
        ${
          currentPage === page
            ? "bg-black text-white border-black"
            : "border-gray-300 hover:bg-gray-100"
        }`}
          >
            {page}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-lg border border-gray-300  text-lg
               hover:bg-gray-100 transition disabled:opacity-50"
        >
          »
        </button>
      </div>
    </div>
  );
}
