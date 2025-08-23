import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const PhuongThucThanhToanSchema = z.object({
  tenPhuongThuc: z.string(),
});

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.phuongThucThanhToan.findMany();
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function POST(req: NextRequest) {
  const data = await req.json();
  const successfull = PhuongThucThanhToanSchema.safeParse(data);
  if (!successfull.success) {
    return NextResponse.json({ error: successfull.error }, { status: 400 });
  }
  try {
    const newNhanVien = await prisma.phuongThucThanhToan.createMany({
      data: {
        tenPhuongThuc: successfull.data.tenPhuongThuc,
      },
    });
    return NextResponse.json({ newNhanVien }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
