import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { kMaxLength } from "buffer";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { data } from "react-router-dom";
import { Id } from "react-toastify";
import z, { json } from "zod";
import { id } from "zod/locales";
import redis from "@/lib/redis";

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
  const cachekey = `khachhang:${id}`;
  try {
    const cache = await redis.get(cachekey);

    if (cache) {
      return NextResponse.json(
        { data: JSON.parse(cache), cache: true },
        { status: 200 }
      );
    }
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
    await redis.set(cachekey, JSON.stringify(data), "EX", 600);
    // đồng thời cập nhật cache list nếu cóoo
    const list = await prisma.khachHang.findMany();
    await redis.set("khachhang:list", JSON.stringify(list), "EX", 600);
    return NextResponse.json({ data, cache: false }, { status: 200 });
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
    await redis.del(`khachhang:${id}`);
    await redis.del(`khachhang:list`);
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
    await redis.del(`khachhang:${id}`);
    await redis.del(`khachhang:list`);
    return NextResponse.json({ massage: "xóa id thành công" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
