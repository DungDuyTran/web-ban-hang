"use client";

import { useEffect } from "react";
import { auth } from "@/lib/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";

export default function CheckRole() {
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdTokenResult();
        console.log("Claims:", token.claims);

        if (token.claims.role === "admin") {
          alert("✅ Đây là ADMIN");
        } else {
          alert("❌ Không phải admin");
        }
      }
    });

    return () => unsub();
  }, []);

  return <div>Trang kiểm tra role</div>;
}
