import { NextRequest, NextResponse } from "next/server";
import { admin } from "@/lib/firebaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const { uid } = await req.json();

    await admin.auth().setCustomUserClaims(uid, { role: "admin" });

    return NextResponse.json({
      success: true,
      message: `User ${uid} đã được gán role = admin`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
