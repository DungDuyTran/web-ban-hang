import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const NhanVienSchema = z.object({
  hoTen: z.string(),
  tuoi: z.number(),
  gmail: z.string().max(255),
  sdt: z.string(),
});

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.nhanVien.findMany();
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function POST(req: NextRequest) {
  const data = await req.json();
  const successfull = NhanVienSchema.safeParse(data);
  if (!successfull.success) {
    return NextResponse.json({ error: successfull.error }, { status: 400 });
  }
  try {
    const newNhanVien = await prisma.nhanVien.createMany({
      data: {
        hoTen: successfull.data.hoTen,
        tuoi: successfull.data.tuoi,
        gmail: successfull.data.gmail,
        sdt: successfull.data.sdt,
      },
    });
    return NextResponse.json({ newNhanVien }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
