import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const DonViVanChuyenSchema = z.object({
  tenDonViVanChuyen: z.string(),
  sdt: z.string(),
  gmail: z.string(),
  diaChi: z.string(),
});

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.donViVanChuyen.findMany();
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function POST(req: NextRequest) {
  const data = await req.json();
  const successfull = DonViVanChuyenSchema.safeParse(data);
  if (!successfull.success) {
    return NextResponse.json({ error: successfull.error }, { status: 400 });
  }
  try {
    const newData = await prisma.donViVanChuyen.createMany({
      data: {
        tenDonViVanChuyen: successfull.data.tenDonViVanChuyen,
        sdt: successfull.data.sdt,
        gmail: successfull.data.gmail,
        diaChi: successfull.data.diaChi,
      },
    });
    return NextResponse.json({ newData }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
