import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const dataSchema = z.object({
  soLuong: z.number().int(),
  donHangId: z.number().int().positive(),
  sanPhamId: z.number().int().positive(),
});

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.chiTietDonHang.findMany({
      include: { SanPham: true, DonHang: true },
    });
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function POST(req: NextRequest) {
  const data = await req.json();
  const successfull = dataSchema.safeParse(data);
  if (!successfull.success) {
    return NextResponse.json({ error: successfull.error }, { status: 400 });
  }
  try {
    const newData = await prisma.chiTietDonHang.createMany({
      data: {
        soLuong: successfull.data.soLuong,
        SanPhamId: successfull.data.sanPhamId,
        DonHangId: successfull.data.donHangId,
      },
    });
    return NextResponse.json({ newData }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
