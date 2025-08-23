import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const HinhAnhSchema = z.object({
  tenHinh: z.string(),
  hinhAnh: z.string().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.hinhAnh.findMany();
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function POST(req: NextRequest) {
  const data = await req.json();
  const successfull = HinhAnhSchema.safeParse(data);
  if (!successfull.success) {
    return NextResponse.json({ error: successfull.error }, { status: 400 });
  }
  try {
    const newNhanVien = await prisma.hinhAnh.createMany({
      data: {
        tenHinh: successfull.data.tenHinh,
        hinhAnh: successfull.data.hinhAnh,
      },
    });
    return NextResponse.json({ newNhanVien }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
