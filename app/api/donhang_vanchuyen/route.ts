import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const DonHangVanChuyenSchema = z.object({
  donHangId: z.number().int(),
  vanChuyenId: z.number().int(),
});

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.donHang_VanChuyen.findMany({
      include: { DonHang: true, DonViVanChuyen: true },
    });
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function POST(req: NextRequest) {
  const data = await req.json();
  const successfull = DonHangVanChuyenSchema.safeParse(data);
  if (!successfull.success) {
    return NextResponse.json({ error: successfull.error }, { status: 400 });
  }
  try {
    const newData = await prisma.donHang_VanChuyen.createMany({
      data: {
        DonHangId: successfull.data.donHangId,
        DonViVanChuyenId: successfull.data.donHangId,
      },
    });
    return NextResponse.json({ newData }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
