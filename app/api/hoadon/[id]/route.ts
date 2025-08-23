import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { number, z } from "zod";
import { data } from "react-router-dom";

const HoaDonSchema = z.object({
  ngayLap: z.coerce.date(),
  tongTien: z.coerce.number().nonnegative().multipleOf(0.01),

  trangThai: z.string(),
  khachHangId: z.coerce.number().int().positive(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const data = await prisma.hoaDon.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        KhachHang: true,
      },
    });
    if (!data) {
      return NextResponse.json(
        { message: "Không có hóa đơn nào có id này" },
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
  const successfull = HoaDonSchema.safeParse(data);
  if (!successfull.success) {
    return NextResponse.json({ error: successfull.error }, { status: 400 });
  }

  try {
    const newHoaDon = await prisma.hoaDon.update({
      where: {
        id: Number(id),
      },
      data: {
        ngayLap: successfull.data.ngayLap,
        tongTien: successfull.data.tongTien,
        trangThai: successfull.data.trangThai,
        KhachHangId: successfull.data.khachHangId,
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
    const deleted = await prisma.hoaDon.delete({
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
