"use client";

import { useEffect } from "react";
import {
  useSidebarStore,
  hydrateExpandedOnClient,
} from "@/store/ui/sidebarStore";
import { Button } from "primereact/button";
import Link from "next/link";

export function CategoriesSidebar() {
  const { isOpenMobile, toggleMobile } = useSidebarStore();
  useEffect(() => {
    hydrateExpandedOnClient();
  }, []);

  return (
    <aside
      aria-label="Categories navigation"
      className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-white shadow-sm p-3
        md:static md:z-auto md:translate-x-0
        ${isOpenMobile ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        transition-transform
      `}
    >
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-base font-semibold">Categories</h2>
        <Button
          icon="pi pi-times"
          className="md:hidden"
          aria-label="Close sidebar"
          onClick={() => toggleMobile(false)}
          text
        />
      </div>
      <nav className="mt-4 space-y-1 text-sm">
        <Link
          href="/"
          className="block rounded-lg px-2 py-2 hover:bg-gray-100 focus:outline-none focus:ring-2"
        >
          All products
        </Link>
        <div className="rounded-lg border p-3">
          <p className="text-xs text-gray-500">
            Category tree will appear here (Step 3).
          </p>
        </div>
      </nav>
    </aside>
  );
}
