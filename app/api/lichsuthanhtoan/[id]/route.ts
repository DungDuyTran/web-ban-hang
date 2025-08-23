import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { number, z } from "zod";
import { data } from "react-router-dom";

const LichSuThanhToanSchema = z.object({
  ngayThanhToan: z.coerce.date(),
  HoaDonId: z.number().int().positive(),
  PhuongThucId: z.number().int().positive(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const data = await prisma.lichSuThanhToan.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        HoaDon: true,
        PhuongThucThanhToan: true,
      },
    });
    if (!data) {
      return NextResponse.json(
        { message: "Không có lịch sử thanh toán nào có id này" },
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
  const successfull = LichSuThanhToanSchema.safeParse(data);
  if (!successfull.success) {
    return NextResponse.json({ error: successfull.error }, { status: 400 });
  }

  try {
    const newLichSu = await prisma.lichSuThanhToan.updateMany({
      where: {
        id: Number(id),
      },
      data: {
        ngayThanhToan: successfull.data.ngayThanhToan,
        HoaDonId: successfull.data.HoaDonId,
        PhuongThucThanhToanId: successfull.data.PhuongThucId,
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
    const deleted = await prisma.lichSuThanhToan.delete({
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
