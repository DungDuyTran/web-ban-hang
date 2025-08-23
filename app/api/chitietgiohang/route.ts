import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const chiTietSchema = z.object({
  soLuong: z.number().int(),
  donGia: z.number().nonnegative().multipleOf(0.01),
  gioHangId: z.number().int().positive(),
  sanPhamId: z.number().int().positive(),
});

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.chiTietGioHang.findMany({
      include: {
        GioHang: true,
        SanPham: true,
      },
    });
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function POST(req: NextRequest) {
  const data = await req.json();
  const successfull = chiTietSchema.safeParse(data);
  if (!successfull.success) {
    return NextResponse.json({ error: successfull.error }, { status: 400 });
  }
  try {
    const newData = await prisma.chiTietGioHang.createMany({
      data: {
        soLuong: successfull.data.soLuong,
        donGia: successfull.data.donGia,
        GioHangId: successfull.data.gioHangId,
        SanPhamId: successfull.data.sanPhamId,
      },
    });
    return NextResponse.json({ newData }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
