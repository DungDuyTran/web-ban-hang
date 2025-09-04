// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Product } from "@/types";

// export default function ProductPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch("/api/sanpham");
//         const data = await res.json();
//         setProducts(data);
//       } catch (error) {
//         console.error("Lỗi khi load sản phẩm:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   if (loading) return <p className="text-black">Đang tải sản phẩm...</p>;

//   return (
//     <div className="p-6 bg-white text-black">
//       <h1 className="text-3xl font-bold mb-6 text-center">
//         Danh sách sản phẩm
//       </h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
//         {products.length === 0 && <p>Không có sản phẩm nào</p>}
//         {products.map((product) => (
//           <Link
//             key={product.id}
//             href={`/product/${product.id}`}
//             className="hover:shadow-lg shadow-md transition p-4 flex flex-col"
//           >
//             <div className="w-full h-48 relative mb-4">
//               <Image
//                 src={product.hinhAnhUrl || "/no-image.png"}
//                 alt={product.tenSanPham}
//                 fill
//                 unoptimized
//                 className="object-cover rounded-md"
//               />
//             </div>
//             <h2 className="text-lg font-semibold text-center">
//               {product.tenSanPham}
//             </h2>
//             <div className="mt-2 text-xl flex justify-center">
//               {product.giaKhuyenMai ? (
//                 <div>
//                   <span className="text-red-500 font-bold mr-2">
//                     {product.giaKhuyenMai.toLocaleString()} đ
//                   </span>
//                   <span className="line-through text-gray-400">
//                     {product.giaGoc.toLocaleString()}đ
//                   </span>
//                 </div>
//               ) : (
//                 <span className="text-gray-800 font-bold">
//                   {product.giaGoc.toLocaleString()}đ
//                 </span>
//               )}
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }
