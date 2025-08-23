"use client";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

const DangKy = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signup, loginWithGoogle } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError("Vui lòng nhập email và mật khẩu");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await signup(formData.email, formData.password);
      toast.success("Đăng ký thành công!");
      router.push("/"); // ✅ Dùng useRouter thay useNavigate
    } catch (err: any) {
      console.error("Signup error:", err);
      let errorMessage = "Đăng ký thất bại";

      switch (err.code) {
        case "auth/email-already-in-use":
          errorMessage = "Email đã tồn tại";
          break;
        case "auth/invalid-email":
          errorMessage = "Email không hợp lệ";
          break;
        case "auth/weak-password":
          errorMessage = "Mật khẩu quá yếu";
          break;
      }

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await loginWithGoogle();
      toast.success("Đăng ký bằng Google thành công!");
      router.push("/");
    } catch (err) {
      console.error("Google sign up error:", err);
      const errorMessage = "Không thể đăng ký với Google";
      setError(errorMessage);
      toast.error(errorMessage);
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
        <div className="bg-[rgb(89,48,17)] bg-opacity-60 p-10 rounded-lg w-[400px] ">
          <h1 className="text-4xl font-bold text-red-600 mb-8 text-center">
            Đăng ký
          </h1>

          {error && (
            <p className="p-3 bg-red-400 my-2 text-white rounded">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="p-4 rounded bg-[rgba(163,86,28,0.91)] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu (tối thiểu 6 ký tự)"
              value={formData.password}
              onChange={handleChange}
              className="p-4 rounded bg-[rgba(163,86,28,0.91)] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded disabled:opacity-50"
            >
              {loading ? "Đang đăng ký..." : "Đăng ký"}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-600" />
            <span className="mx-4 text-gray-400">HOẶC</span>
            <div className="flex-grow h-px bg-gray-600" />
          </div>

          <button
            onClick={handleGoogleSignUp}
            className="w-full bg-white hover:bg-gray-100 text-black font-semibold py-3 rounded flex items-center justify-center gap-2"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-6 h-6"
            />
            Đăng ký với Google
          </button>

          <p className="mt-8 text-gray-400 text-center text-sm">
            Đã có tài khoản?{" "}
            <Link className="text-white hover:underline" href="/dangNhap">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DangKy;
