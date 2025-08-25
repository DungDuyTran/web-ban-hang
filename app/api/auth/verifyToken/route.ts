import { NextRequest, NextResponse } from "next/server";
import { admin } from "@/lib/firebaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    const decoded = await admin.auth().verifyIdToken(token);

    return NextResponse.json({ valid: true, claims: decoded });
  } catch {
    return NextResponse.json({ valid: false }, { status: 401 });
  }
}
