"use client";

import { Button } from "primereact/button";
import { useSidebarStore } from "@/store/ui/sidebarStore";
import { Image } from "primereact/image";

export default function Header() {
  const { toggleMobile } = useSidebarStore();

  return (
    <header className="sticky top-0 z-30 bg-[#ffe600] border-b border-[#0000001a]">
      <div className="mx-auto flex max-w-screen-xl items-center gap-3 py-3">
        <div className="md:hidden">
          <Button
            icon="pi pi-bars"
            text
            aria-label="Open sidebar"
            onClick={() => toggleMobile(true)}
          />
        </div>
        <div className="flex w-auto h-auto justify-start items-center flex-row gap-4">
          <Image
            src="/Images/webp/logo_large_plus@2x.webp"
            alt="Logo de mercado libre"
            width="150"
          />
          <div className="h-9 w-1 bg-[#303172]"></div>
          <h1 className="text-[#303172] text-xl font-bold">Meli Store</h1>
        </div>
      </div>
    </header>
  );
}
