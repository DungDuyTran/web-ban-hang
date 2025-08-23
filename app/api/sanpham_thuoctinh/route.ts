import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const sanPhamThuocTinhSchema = z.object({
  sanPhamId: z.number().positive(),
  thuocTinhId: z.number().positive(),
});

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.sanPham_ThuocTinh.findMany({
      include: { SanPham: true, ThuocTinh: true },
    });
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function POST(req: NextRequest) {
  const data = await req.json();
  const successfull = sanPhamThuocTinhSchema.safeParse(data);
  if (!successfull.success) {
    return NextResponse.json({ error: successfull.error }, { status: 400 });
  }
  try {
    const newNhanVien = await prisma.sanPham_ThuocTinh.createMany({
      data: {
        SanPhamId: successfull.data.sanPhamId,
        ThuocTinhId: successfull.data.thuocTinhId,
      },
    });
    return NextResponse.json({ newNhanVien }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
