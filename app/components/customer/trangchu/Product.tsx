"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";

export default function ProductCus() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // lọc
  const [filters, setFilter] = useState({
    danhMuc: "",
    thuongHieu: "",
    minPrice: "",
    maxPrice: "",
  });

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

  if (loading) return <p className="text-black">Đang loading sản phẩm...</p>;

  // danh sách lọc
  const danhMucList = [
    ...new Set(products.map((sp) => sp.DanhMuc?.tenDanhMuc).filter(Boolean)),
  ] as string[];
  const thuongHieuList = [
    ...new Set(
      products.map((sp) => sp.ThuongHieu?.tenThuongHieu).filter(Boolean)
    ),
  ] as string[];

  // áp dụng bộ lọc
  const filteredProduct = products.filter((sp) => {
    const matchDanhMuc =
      !filters.danhMuc || sp.DanhMuc?.tenDanhMuc === filters.danhMuc;
    const matchThuongHieu =
      !filters.thuongHieu ||
      sp.ThuongHieu?.tenThuongHieu === filters.thuongHieu;

    const min = filters.minPrice ? Number(filters.minPrice) : null;
    const max = filters.maxPrice ? Number(filters.maxPrice) : null;

    const giaThucTe = sp.giaKhuyenMai ?? sp.giaGoc; // nếu có khuyến mãi thì dùng khuyến mãi

    const matchMin = min === null || giaThucTe >= min;
    const matchMax = max === null || giaThucTe <= max;
    return matchDanhMuc && matchThuongHieu && matchMin && matchMax;
  });

  const resetFilters = () =>
    setFilter({ danhMuc: "", thuongHieu: "", minPrice: "", maxPrice: "" });

  return (
    <div className="p-6 bg-white text-black w-screen">
      <h1 className="text-4xl font-bold font-mono flex justify-center mt-4 mb-5">
        Danh sách sản phẩm
      </h1>

      {/* Bộ lọc */}
      <div className="flex flex-wrap gap-7 justify-center mb-5">
        {/* Danh mục */}
        <select
          value={filters.danhMuc}
          onChange={(e) => setFilter({ ...filters, danhMuc: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">Danh mục</option>
          {danhMucList.map((dm) => (
            <option key={dm} value={dm}>
              {dm}
            </option>
          ))}
        </select>

        {/* Thương hiệu */}
        <select
          value={filters.thuongHieu}
          onChange={(e) =>
            setFilter({ ...filters, thuongHieu: e.target.value })
          }
          className="border p-2 rounded"
        >
          <option value="">Thương hiệu</option>
          {thuongHieuList.map((th) => (
            <option key={th} value={th}>
              {th}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Giá từ"
          value={filters.minPrice}
          onChange={(e) => setFilter({ ...filters, minPrice: e.target.value })}
          className="border p-2 rounded w-24"
        />
        <input
          type="number"
          placeholder="Giá đến"
          value={filters.maxPrice}
          onChange={(e) => setFilter({ ...filters, maxPrice: e.target.value })}
          className="border p-2 rounded w-24"
        />
        <button onClick={resetFilters} className="px-3 py-2 border rounded">
          Reset
        </button>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5">
        {filteredProduct.length === 0 && <p>Không tìm thấy sản phẩm</p>}

        {filteredProduct.map((product) => (
          <Link href={`/customer/product/${product.id}`} key={product.id}>
            <div className="hover:shadow-lg shadow-2xl transition p-4 flex flex-col cursor-pointer h-[300px] border">
              {/* Ảnh */}
              <div className="w-full h-48 relative mb-4">
                <Image
                  src={product.hinhAnhUrl || "/no-image.png"}
                  alt={product.tenSanPham}
                  fill
                  unoptimized
                  className="object-cover rounded-md"
                />
              </div>

              {/* Tên sản phẩm */}
              <h2 className="text-lg font-semibold text-center line-clamp-1">
                {product.tenSanPham}
              </h2>

              {/* Giá */}
              <div className="mt-[10px] text-xl flex justify-center">
                {product.giaKhuyenMai ? (
                  <div className="text-center">
                    <span className="text-red-500 font-bold mr-2">
                      {product.giaKhuyenMai.toLocaleString()} đ
                    </span>
                    <span className="line-through text-gray-400">
                      {product.giaGoc.toLocaleString()} đ
                    </span>
                  </div>
                ) : (
                  <span className="text-gray-800 font-bold">
                    {product.giaGoc.toLocaleString()} đ
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
