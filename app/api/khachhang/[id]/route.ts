import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { kMaxLength } from "buffer";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { data } from "react-router-dom";
import { Id } from "react-toastify";
import z, { json } from "zod";
import { id } from "zod/locales";

const KhachHangSchema = z.object({
  hoTen: z.string().max(255),
  tuoi: z.number(),
  gmail: z.string(),
  sdt: z.string(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const data = await prisma.khachHang.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!data) {
      return NextResponse.json(
        { message: "Không tìm thấy người dùng với id này" },
        { status: 400 }
      );
    }
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function PUT(
  res: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await res.json();
  const successfull = KhachHangSchema.safeParse(data);
  if (!successfull.success) {
    return NextResponse.json({ error: successfull.error }, { status: 400 });
  }
  try {
    const updated = await prisma.khachHang.update({
      where: {
        id: Number(id),
      },
      data: {
        hoTen: successfull.data.hoTen,
        tuoi: successfull.data.tuoi,
        gmail: successfull.data.gmail,
        sdt: successfull.data.sdt,
      },
    });
    return NextResponse.json({ message: "update thành công" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const deleted = await prisma.khachHang.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({ massage: "xóa id thành công" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
