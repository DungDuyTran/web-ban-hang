import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { data } from "react-router-dom";

const HoaDonSchema = z.object({
  ngayLap: z.coerce.date(),
  tongTien: z.number().nonnegative().multipleOf(0.01),
  trangThai: z.string(),
  khachHangId: z.number().int().positive(),
});

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.hoaDon.findMany({ include: { KhachHang: true } });
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function POST(req: NextRequest) {
  const data = await req.json();
  const successfull = HoaDonSchema.safeParse(data);
  if (!successfull.success) {
    return NextResponse.json({ error: successfull.error }, { status: 400 });
  }
  try {
    const newHoaDon = await prisma.hoaDon.createMany({
      data: {
        ngayLap: successfull.data.ngayLap,
        tongTien: successfull.data.tongTien,
        trangThai: successfull.data.trangThai,
        KhachHangId: successfull.data.khachHangId,
      },
    });
    return NextResponse.json({ newHoaDon }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
