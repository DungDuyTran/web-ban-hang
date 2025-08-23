import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const LichSuThanhToanSchema = z.object({
  ngayThanhToan: z.coerce.date(),
  HoaDonId: z.number().int().positive(),
  PhuongThucId: z.number().int().positive(),
});

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.lichSuThanhToan.findMany({
      include: {
        HoaDon: true,
        PhuongThucThanhToan: true,
      },
    });
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function POST(req: NextRequest) {
  const data = await req.json();
  const successfull = LichSuThanhToanSchema.safeParse(data);
  if (!successfull.success) {
    return NextResponse.json({ error: successfull.error }, { status: 400 });
  }
  try {
    const newLichSu = await prisma.lichSuThanhToan.createMany({
      data: {
        ngayThanhToan: successfull.data.ngayThanhToan,
        HoaDonId: successfull.data.HoaDonId,
        PhuongThucThanhToanId: successfull.data.PhuongThucId,
      },
    });
    return NextResponse.json({ newLichSu }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
