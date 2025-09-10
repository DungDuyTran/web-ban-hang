import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { number, z } from "zod";
import { data } from "react-router-dom";

const SanPhamSchema = z.object({
  tenSanPham: z.string(),
  moTa: z.string(),
  giaGoc: z.string(),
  giaKhuyenMai: z.string(),
  soLuongTon: z.number().int(),
  trangThai: z.string(),
  danhMucId: z.number().int().positive(),
  thuongHieuId: z.number().int().positive(),
  hinhAnhId: z.number().int().positive(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const data = await prisma.sanPham.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!data) {
      return NextResponse.json(
        { message: "Không có sản phẩm nào có id này" },
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
  const successfull = SanPhamSchema.safeParse(data);
  if (!successfull.success) {
    return NextResponse.json({ error: successfull.error }, { status: 400 });
  }

  try {
    const newdata = await prisma.sanPham.updateMany({
      where: {
        id: Number(id),
      },
      data: {
        tenSanPham: successfull.data.tenSanPham,
        moTa: successfull.data.moTa,
        giaGoc: successfull.data.giaGoc,
        giaKhuyenMai: successfull.data.giaKhuyenMai,
        soLuongTon: successfull.data.soLuongTon,
        trangThai: successfull.data.trangThai,
        DanhMucId: successfull.data.danhMucId,
        ThuongHieuId: successfull.data.thuongHieuId,
        HinhAnhId: successfull.data.hinhAnhId,
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
    const deleted = await prisma.sanPham.delete({
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
