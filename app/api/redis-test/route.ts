import { NextResponse } from "next/server";
import redis from "@/lib/redis";

export async function GET() {
  try {
    await redis.set("foo", "bar");
    const value = await redis.get("foo");

    return NextResponse.json({ message: "Redis hoạt động!", data: value });
  } catch (error) {
    console.error("Redis test error:", error);
    return NextResponse.json({ error: "Kết nối thất bại" }, { status: 500 });
  }
}
