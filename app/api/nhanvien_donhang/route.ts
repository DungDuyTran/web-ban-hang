import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const NhanVien_DonHangSchema = z.object({
  nhanVienid: z.number().int().positive(),
  donHangid: z.number().int().positive(),
});

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.nhanVien_DonHang.findMany({
      include: { NhanVien: true, DonHang: true },
    });
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function POST(req: NextRequest) {
  const data = await req.json();
  const successfull = NhanVien_DonHangSchema.safeParse(data);
  if (!successfull.success) {
    return NextResponse.json({ error: successfull.error }, { status: 400 });
  }
  try {
    const newNhanVienDH = await prisma.nhanVien_DonHang.createMany({
      data: {
        NhanVienId: successfull.data.nhanVienid,
        DonHangId: successfull.data.donHangid,
      },
    });
    return NextResponse.json({ newNhanVienDH }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
