import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./hooks/useAuth";
import { CartProvider } from "./hooks/CartContext";
import CartDialog from "./components/customer/cart/CartDialog";

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DIRTYCOINS",
  description: "Shop thời trang mới",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={`${roboto.variable} antialiased`}>
        <AuthProvider>
          <CartProvider>
            {children}

            <CartDialog />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
