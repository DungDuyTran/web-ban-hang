import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ChiTietHoaDonSchema = z.object({
  hoaDonId: z.number().int(),
  donHangId: z.number().int(),
});

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.chiTietHoaDon.findMany({
      include: {
        HoaDon: true,
        DonHang: true,
      },
    });
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function POST(req: NextRequest) {
  const data = await req.json();
  const successfull = ChiTietHoaDonSchema.safeParse(data);
  if (!successfull.success) {
    return NextResponse.json({ error: successfull.error }, { status: 400 });
  }
  try {
    const newHoaDon = await prisma.chiTietHoaDon.createMany({
      data: {
        DonHangId: successfull.data.donHangId,
        HoaDonId: successfull.data.hoaDonId,
      },
    });
    return NextResponse.json({ newHoaDon }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
