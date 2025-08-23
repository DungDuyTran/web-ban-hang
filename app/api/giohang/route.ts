import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { kMaxLength } from "buffer";

const GioHangSchema = z.object({
  ngayCapNhat: z.coerce.date(),
  khachHangId: z.number().positive(),
});

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.gioHang.findMany({
      include: { KhachHang: true },
    });
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function POST(req: NextRequest) {
  const data = await req.json();
  const successfull = GioHangSchema.safeParse(data);
  if (!successfull.success) {
    return NextResponse.json({ error: successfull.error }, { status: 400 });
  }
  try {
    const newGioHang = await prisma.gioHang.createMany({
      data: {
        ngayCapNhat: successfull.data.ngayCapNhat,
        KhachHangId: successfull.data.khachHangId,
      },
    });
    return NextResponse.json({ newGioHang }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
