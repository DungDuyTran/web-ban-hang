"use client";

import { useState } from "react";
import { auth, googleProvider } from "@/lib/firebaseClient";
import { signInWithPopup, getIdTokenResult } from "firebase/auth";

export default function SetAdminPage() {
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleSetAdmin = async () => {
    setLoading(true);
    try {
      // Đăng nhập Google
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      //Gọi API để set role admin
      const res = await fetch("/api/setAdmin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: user.uid }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Set admin thất bại");

      setMessage("Set Admin Result: " + JSON.stringify(data));

      //Làm mới token để nhận custom claims
      await user.getIdToken(true);

      // Lấy claim mới
      const tokenResult = await getIdTokenResult(user);
      console.log("Token Result:", tokenResult);

      if (tokenResult.claims.admin) {
        setIsAdmin(true);
        setMessage("Bạn đã là ADMIN!");
      } else {
        setIsAdmin(false);
        setMessage("Bạn chưa có quyền admin!");
      }
    } catch (error: any) {
      console.error("❌ Lỗi đăng nhập:", error);
      setMessage("Lỗi: " + (error.message || "Không rõ nguyên nhân"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={handleSetAdmin}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Đang xử lý..." : "Đăng nhập & Set Admin"}
      </button>

      {message && <p className="mt-4">{message}</p>}

      {isAdmin !== null && (
        <p className="mt-2">
          Quyền hiện tại:{" "}
          <span className={isAdmin ? "text-green-600" : "text-red-600"}>
            {isAdmin ? "Admin" : "User thường"}
          </span>
        </p>
      )}
    </div>
  );
}
