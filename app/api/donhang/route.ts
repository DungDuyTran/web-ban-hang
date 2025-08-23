import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { data } from "react-router-dom";

const DonHangSchema = z.object({
  ngayDat: z.coerce.date(),
  tongTien: z.number().nonnegative().multipleOf(0.01),
  trangThai: z.string(),
  diaChiNhan: z.string(),
  ngayVanChuyen: z.coerce.date(),
  khachHangId: z.number().int().positive(),
});

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.donHang.findMany({
      include: { KhachHang: true },
    });
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function POST(req: NextRequest) {
  const data = await req.json();
  const successfull = DonHangSchema.safeParse(data);
  if (!successfull.success) {
    return NextResponse.json({ error: successfull.error }, { status: 400 });
  }
  try {
    const newDonHang = await prisma.donHang.createMany({
      data: {
        ngayDat: successfull.data.ngayDat,
        tongTien: successfull.data.tongTien,
        trangThai: successfull.data.trangThai,
        diaChiNhan: successfull.data.diaChiNhan,
        ngayVanChuyen: successfull.data.ngayVanChuyen,
        KhachHangId: successfull.data.khachHangId,
      },
    });
    return NextResponse.json({ newDonHang }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
