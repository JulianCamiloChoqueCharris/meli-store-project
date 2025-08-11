"use client";

import { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import SidebarCategories from "@/components/SidebarCategories";

export default function MobileFilters() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="md:hidden bg-white border-b px-4 py-2 flex items-center justify-between">
        <span className="text-sm text-[#737373]">Filtros</span>
        <Button
          label="Abrir filtros"
          icon="pi pi-filter"
          onClick={() => setOpen(true)}
          className="w-auto !border-[#303172] !text-[#303172] hover:!bg-[#303172] hover:!text-white py-1 px-2 box-border rounded-lg gap-2 text-base"
        />
      </div>

      <Sidebar
        visible={open}
        position="left"
        onHide={() => setOpen(false)}
        className="w-[85vw] max-w-sm"
        blockScroll
        dismissable
        closeOnEscape
        header=""
      >
        <div className="h-full overflow-y-auto pr-2">
          <SidebarCategories />
        </div>
      </Sidebar>
    </>
  );
}
