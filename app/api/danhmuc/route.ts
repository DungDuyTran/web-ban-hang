import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const DanhMucSchema = z.object({
  tenDanhMuc: z.string(),
  moTa: z.string(),
});

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.danhMuc.findMany();
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function POST(req: NextRequest) {
  const data = await req.json();
  const successfull = DanhMucSchema.safeParse(data);
  if (!successfull.success) {
    return NextResponse.json({ error: successfull.error }, { status: 400 });
  }
  try {
    const newDanhMuc = await prisma.danhMuc.createMany({
      data: {
        tenDanhMuc: successfull.data.tenDanhMuc,
        moTa: successfull.data.moTa,
      },
    });
    return NextResponse.json({ newDanhMuc }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
