import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import z, { json } from "zod";

const KhachHangSchema = z.object({
  hoTen: z.string().max(255),
  tuoi: z.number(),
  gmail: z.string(),
  sdt: z.string(),
});

const KhachHangArraySchema = z.array(KhachHangSchema);

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.khachHang.findMany();
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const succesfull = KhachHangSchema.safeParse(data);
    if (!succesfull.success) {
      return NextResponse.json({ error: succesfull.error }, { status: 400 });
    }
    const newKhachHang = await prisma.khachHang.create({
      data: {
        hoTen: succesfull.data.hoTen,
        tuoi: succesfull.data.tuoi,
        gmail: succesfull.data.gmail,
        sdt: succesfull.data.sdt,
      },
    });
    return NextResponse.json({ newKhachHang }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
