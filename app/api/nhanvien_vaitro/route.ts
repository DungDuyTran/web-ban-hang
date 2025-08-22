import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const NhanVien_VaiTroSchema = z.object({
  nhanVienId: z.number().int().positive(),
  vaiTroId: z.number().int().positive(),
});

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.nhanVien_VaiTro.findMany({
      include: {
        NhanVien: true,
        VaiTro: true,
      },
    });
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function POST(req: NextRequest) {
  const data = await req.json();
  const successfull = NhanVien_VaiTroSchema.safeParse(data);
  if (!successfull.success) {
    return NextResponse.json({ error: successfull.error }, { status: 400 });
  }
  try {
    const newData = await prisma.nhanVien_VaiTro.createMany({
      data: {
        NhanVienId: successfull.data.nhanVienId,
        VaiTroId: successfull.data.vaiTroId,
      },
    });
    return NextResponse.json({ newData }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
