// import { admin } from "@/lib/firebaseAdmin";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const { uid } = await req.json();

//     await admin.auth().setCustomUserClaims(uid, { admin: true });

//     return NextResponse.json({
//       success: true,
//       message: "Set admin thành công",
//     });
//   } catch (error: any) {
//     return NextResponse.json(
//       { success: false, error: error.message },
//       { status: 500 }
//     );
//   }
// }
