import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { number, z } from "zod";
import { data } from "react-router-dom";

const DonViVanChuyenSchema = z.object({
  tenDonViVanChuyen: z.string(),
  sdt: z.string(),
  gmail: z.string(),
  diaChi: z.string(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const data = await prisma.donViVanChuyen.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!data) {
      return NextResponse.json(
        { message: "Không có đơn vị vận chuyển nào có id này" },
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
  const successfull = DonViVanChuyenSchema.safeParse(data);
  if (!successfull.success) {
    return NextResponse.json({ error: successfull.error }, { status: 400 });
  }

  try {
    const newDVVC = await prisma.donViVanChuyen.updateMany({
      where: {
        id: Number(id),
      },
      data: {
        tenDonViVanChuyen: successfull.data.tenDonViVanChuyen,
        sdt: successfull.data.sdt,
        gmail: successfull.data.gmail,
        diaChi: successfull.data.diaChi,
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
    const deleted = await prisma.donViVanChuyen.delete({
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
