import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { number, z } from "zod";
import { data } from "react-router-dom";

const NhanVienSchema = z.object({
  hoTen: z.string(),
  tuoi: z.number(),
  gmail: z.string().max(255),
  sdt: z.string(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const data = await prisma.nhanVien.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!data) {
      return NextResponse.json(
        { message: "Không có nhân viên nào có id này" },
        { status: 400 }
      );
    }
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await req.json();
  const successfull = NhanVienSchema.safeParse(data);
  if (!successfull.success) {
    return NextResponse.json({ error: successfull.error }, { status: 400 });
  }

  try {
    const newNhanVien = await prisma.nhanVien.updateMany({
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
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const deleted = await prisma.nhanVien.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json(
      { message: "xóa thành công nha quí zị" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
