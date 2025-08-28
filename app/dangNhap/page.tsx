"use client";
import { useState } from "react";
import { auth, googleProvider } from "@/lib/firebaseClient";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("⚠️ Vui lòng nhập đầy đủ thông tin");
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      router.push("/"); // chuyển về trang chủ sau khi login
    } catch (err: any) {
      console.error("Login error:", err);
      let errorMessage = "❌ Đăng nhập thất bại";
      switch (err.code) {
        case "auth/user-not-found":
          errorMessage = "Tài khoản không tồn tại";
          break;
        case "auth/wrong-password":
          errorMessage = "Mật khẩu không đúng";
          break;
        case "auth/invalid-email":
          errorMessage = "Email không hợp lệ";
          break;
        case "auth/too-many-requests":
          errorMessage = "Quá nhiều lần thử. Vui lòng thử lại sau";
          break;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/");
    } catch (err) {
      console.error("Google sign in error:", err);
      setError("❌ Không thể đăng nhập với Google");
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white">
      <img
        src="https://pendecor.vn/uploads/files/2023/05/01/thiet-ke-shop-quan-ao-nam-4.jpg"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover opacity-90"
      />

      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <div className="bg-[rgb(89,48,17)] bg-opacity-60 p-10 rounded-lg w-[400px]">
          <h1 className="text-4xl font-bold text-red-600 mb-8 text-center">
            Đăng nhập
          </h1>

          {error && (
            <div className="p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded mb-4 text-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="p-4 rounded bg-[rgba(163,86,28,0.91)] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Mật khẩu"
              className="p-4 rounded bg-[rgba(163,86,28,0.91)] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded disabled:opacity-50"
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-600" />
            <span className="mx-4 text-gray-400">HOẶC</span>
            <div className="flex-grow h-px bg-gray-600" />
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-white hover:bg-gray-100 text-black font-semibold py-3 rounded flex items-center justify-center gap-2"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-6 h-6"
            />
            Đăng nhập với Google
          </button>

          <p className="mt-8 text-gray-400 text-center text-sm">
            Chưa có tài khoản?{" "}
            <a className="text-white hover:underline" href="/dangKy">
              Đăng ký ngay
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
