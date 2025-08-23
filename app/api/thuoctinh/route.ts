import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ThuocTinhSchema = z.object({
  kichThuoc: z.string(),
  mauSac: z.string(),
});

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.thuocTinh.findMany();
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function POST(req: NextRequest) {
  const data = await req.json();
  const successfull = ThuocTinhSchema.safeParse(data);
  if (!successfull.success) {
    return NextResponse.json({ error: successfull.error }, { status: 400 });
  }
  try {
    const newThuocTinh = await prisma.thuocTinh.createMany({
      data: {
        kichThuoc: successfull.data.kichThuoc,
        mauSac: successfull.data.mauSac,
      },
    });
    return NextResponse.json({ newThuocTinh }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
