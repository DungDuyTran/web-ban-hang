import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import redis from "@/lib/redis";

const SanPhamSchema = z.object({
  tenSanPham: z.string(),
  moTa: z.string(),
  giaGoc: z.number(),
  giaKhuyenMai: z.number().optional(),
  soLuongTon: z.number().int(),
  trangThai: z.string(),
  danhMucId: z.number().int().positive(),
  thuongHieuId: z.number().int().positive(),
  hinhAnhId: z.number().int().positive(),
});

export async function GET(req: NextRequest) {
  try {
    // 1 kiểm tra cache Redis trước
    const cache = await redis.get("sampham:list");
    if (cache) {
      console.log("Dữ liệu lấy từ Redis Cache");
      const data = JSON.stringify(cache);
      return NextResponse.json({ data, cache: true }, { status: 200 });
    }
    // 2. Nếu không có thì lấy trong db
    const data = await prisma.sanPham.findMany({
      include: {
        DanhMuc: true,
        ThuongHieu: true,
        HinhAnh: true,
      },
    });
    //3. Lưu và redis
    await redis.set("sanpham:list", JSON.stringify(data));
    return NextResponse.json({ data, cache: false }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function POST(req: NextRequest) {
  const data = await req.json();
  const successfull = SanPhamSchema.safeParse(data);
  if (!successfull.success) {
    return NextResponse.json({ error: successfull.error }, { status: 400 });
  }
  try {
    const newSanPham = await prisma.sanPham.createMany({
      data: {
        tenSanPham: successfull.data.tenSanPham,
        moTa: successfull.data.moTa,
        giaGoc: successfull.data.giaGoc,
        giaKhuyenMai: successfull.data.giaKhuyenMai,
        soLuongTon: successfull.data.soLuongTon,
        trangThai: successfull.data.trangThai,
        DanhMucId: successfull.data.danhMucId,
        ThuongHieuId: successfull.data.thuongHieuId,
        HinhAnhId: successfull.data.hinhAnhId,
      },
    });
    // xóa cache cũ sau khi thêm mới
    await redis.del("sanpham:list");
    return NextResponse.json({ newSanPham }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
