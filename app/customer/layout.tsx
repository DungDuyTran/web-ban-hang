import TopHeader from "@/app/components/customer/trangchu/Topheader";
import { CartProvider } from "../hooks/CartContext";
import { Toaster } from "sonner";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-50">
        <TopHeader />
      </div>
      <main className="pt-[70px]">
        {children} <Toaster />
      </main>
    </div>
  );
}
