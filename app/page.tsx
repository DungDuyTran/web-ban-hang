import Image from "next/image";
import Content from "@/components/trangChu/content/page";
export default function Home() {
  return (
    <div className=" bg-white text-4xl font-mono flex h-screen ">
      <div className="mt-0">
        <Content />
      </div>
    </div>
  );
}
