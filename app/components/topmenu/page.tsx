"use client";

import Link from "next/link";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
  MenubarSeparator,
} from "@/components/ui/menubar";

export default function TopMenu() {
  return (
    <div className="w-full bg-gray-100 flex justify-center shadow gap-3 opacity-70">
      <Menubar className="bg-transparent border-none gap-6">
        {/* SHOP */}
        <MenubarMenu>
          <MenubarTrigger className="font-semibold text-gray-800">
            SHOP
          </MenubarTrigger>
          <MenubarContent className="bg-black text-white min-w-[220px] opacity-75">
            {/* TOPS có submenu */}
            <MenubarSub>
              <MenubarSubTrigger className="font-bold">TOPS</MenubarSubTrigger>
              <MenubarSubContent className="bg-black text-white min-w-[240px] ml-[10px] ">
                <MenubarItem asChild>
                  <Link href="/shop/tops/tshirts">
                    T-SHIRTS &amp; POLO SHIRTS
                  </Link>
                </MenubarItem>
                <MenubarSeparator className="bg-gray-600 my-2" />
                <MenubarItem asChild>
                  <Link href="/shop/tops/shirts">SHIRTS</Link>
                </MenubarItem>
                <MenubarSeparator className="bg-gray-600 my-2" />
                <MenubarItem asChild>
                  <Link href="/shop/tops/cardigans">
                    SWEATERS &amp; CARDIGANS
                  </Link>
                </MenubarItem>
                <MenubarSeparator className="bg-gray-600 my-2" />
                <MenubarItem asChild>
                  <Link href="/shop/tops/hoodies">
                    SWEATSHIRTS &amp; HOODIES
                  </Link>
                </MenubarItem>
                <MenubarSeparator className="bg-gray-600 my-2" />
                <MenubarItem asChild>
                  <Link href="/shop/tops/outerwear">OUTERWEAR</Link>
                </MenubarItem>
                <MenubarSeparator className="bg-gray-600 my-2" />
              </MenubarSubContent>
            </MenubarSub>

            <MenubarSeparator className="bg-gray-600 my-2" />

            <MenubarItem asChild>
              <Link href="/shop/bottoms">BOTTOMS</Link>
            </MenubarItem>

            <MenubarSeparator className="bg-gray-600 my-2" />

            <MenubarItem asChild>
              <Link href="/shop/accessories">ACCESSORIES</Link>
            </MenubarItem>

            <MenubarSeparator className="bg-gray-600 my-2" />

            <MenubarItem asChild>
              <Link href="/shop/bags">BAGS</Link>
            </MenubarItem>

            <MenubarSeparator className="bg-gray-600 my-2" />

            <MenubarItem asChild>
              <Link href="/shop/womenswear">WOMENSWEAR</Link>
            </MenubarItem>

            <MenubarSeparator className="bg-gray-600 my-2" />

            <MenubarItem asChild>
              <Link href="/shop/combo">COMBO</Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        {/* DRAGON BALL Z */}
        <MenubarMenu>
          <MenubarTrigger className="font-semibold text-gray-800">
            DRAGON BALL Z
          </MenubarTrigger>
          <MenubarContent className="bg-black text-white min-w-[220px] opacity-75">
            <MenubarItem asChild>
              <Link href="/dragonballz/tops">DC | DBZ - TOPS</Link>
            </MenubarItem>

            <MenubarSeparator className="bg-gray-600 my-2" />

            <MenubarItem asChild>
              <Link href="/dragonballz/outerwear">DC | DBZ - OUTERWEAR</Link>
            </MenubarItem>

            <MenubarSeparator className="bg-gray-600 my-2" />

            <MenubarItem asChild>
              <Link href="/dragonballz/accessories">
                DC | DBZ - ACCESSORIES
              </Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        {/* COLLAB'S */}
        <MenubarMenu>
          <MenubarTrigger className="font-semibold text-gray-800">
            COLLAB'S
          </MenubarTrigger>
          <MenubarContent className="bg-black text-white min-w-[220px] opacity-75">
            <MenubarItem asChild>
              <Link href="/collabs/masew">MASEW</Link>
            </MenubarItem>

            <MenubarSeparator className="bg-gray-600 my-2" />

            <MenubarItem asChild>
              <Link href="/collabs/underdogs">THE UNDERDOGS</Link>
            </MenubarItem>

            <MenubarSeparator className="bg-gray-600 my-2" />

            <MenubarItem asChild>
              <Link href="/collabs/dragonballz">DRAGON BALL Z</Link>
            </MenubarItem>

            <MenubarSeparator className="bg-gray-600 my-2" />

            <MenubarItem asChild>
              <Link href="/collabs/lalune">LA LUNE</Link>
            </MenubarItem>

            <MenubarSeparator className="bg-gray-600 my-2" />

            <MenubarItem asChild>
              <Link href="/collabs/gam-esports">GAM ESPORTS</Link>
            </MenubarItem>

            <MenubarSeparator className="bg-gray-600 my-2" />

            <MenubarItem asChild>
              <Link href="/collabs/onepiece">ONE PIECE</Link>
            </MenubarItem>

            <MenubarSeparator className="bg-gray-600 my-2" />

            <MenubarItem asChild>
              <Link href="/collabs/lilwuyn">LIL' WUYN</Link>
            </MenubarItem>

            <MenubarSeparator className="bg-gray-600 my-2" />

            <MenubarItem asChild>
              <Link href="/collabs/16typh">16TYPH</Link>
            </MenubarItem>

            <MenubarSeparator className="bg-gray-600 my-2" />

            <MenubarItem asChild>
              <Link href="/collabs/million-dollar-boy">MILLION DOLLAR BOY</Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        {/* CONTACT */}
        <MenubarMenu>
          <MenubarTrigger className="font-semibold text-gray-800">
            CONTACT
          </MenubarTrigger>
        </MenubarMenu>

        {/* ABOUT US */}
        <MenubarMenu>
          <MenubarTrigger className="font-semibold text-gray-800 ">
            ABOUT US
          </MenubarTrigger>
        </MenubarMenu>

        {/* BEST SELLER */}
        <MenubarMenu>
          <MenubarTrigger className="font-semibold text-gray-800 ">
            BEST SELLER
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
