"use client";

import useSWR from "swr";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "primereact/button";
import { getJSON } from "@/lib/api";
import { buildCategoryTree } from "@/lib/categoryTree";
import type { CategoriesResponse, CategoryNode } from "@/lib/types";
import { useUICategories } from "@/store/uiCategories";

export default function SidebarCategories() {
  const { data, error } = useSWR<CategoriesResponse>(
    "/api/categories",
    getJSON,
    {
      keepPreviousData: true,
    }
  );
  const pathname = usePathname();
  const { expanded, toggle } = useUICategories();

  const tree: CategoryNode[] = data?.ok
    ? buildCategoryTree(data.categories)
    : [];

  return (
    <aside className="w-full md:w-72 h-full overflow-x-hidden overflow-y-auto bg-white p-3">
      <h2 className="text-xl md:text-sm font-bold mb-3 text-[#030300]">
        Categorías
      </h2>

      {error && (
        <div className="text-red-600 text-sm">Error cargando categorías</div>
      )}
      {!data && <div className="h-6 w-24 bg-gray-200 animate-pulse" />}

      <nav className="text-sm">
        <ul className="space-y-1">
          {tree.map((node) => (
            <li key={node.key}>
              {node.children && node.children.length > 0 ? (
                <div className="mb-0.5">
                  <div className="flex items-center">
                    <Button
                      onClick={() => toggle(node.key)}
                      rounded
                      text
                      severity="secondary"
                      className="!h-7 !w-7 !p-0 mr-1 border border-[#303172]/20 hover:border-[#303172] transition"
                      aria-expanded={!!expanded[node.key]}
                      aria-controls={`group-${node.key}`}
                      icon={expanded[node.key] ? "pi pi-minus" : "pi pi-plus"}
                      style={{
                        color: "#303172",
                      }}
                    />
                    <span className="font-medium text-[#030300]">
                      {node.label}
                    </span>
                  </div>

                  {expanded[node.key] && (
                    <ul
                      id={`group-${node.key}`}
                      className="mt-1 ml-8 space-y-0.5"
                    >
                      {node.children.map((child) => {
                        const href = `/${encodeURIComponent(child.key)}`;
                        const active = pathname === href;
                        return (
                          <li key={child.key}>
                            <Link
                              href={href}
                              className={[
                                "block px-2 py-1 rounded-md transition",
                                active
                                  ? "bg-[#ffe600]/60 text-[#030300] font-medium"
                                  : "hover:bg-[#303172]/5 text-[#303172]",
                              ].join(" ")}
                            >
                              {child.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  href={`/${encodeURIComponent(node.key)}`}
                  className={[
                    "block px-2 py-1 rounded-md transition",
                    pathname === `/${node.key}`
                      ? "bg-[#ffe600]/60 text-[#030300] font-medium"
                      : "hover:bg-[#303172]/5 text-[#303172]",
                  ].join(" ")}
                >
                  {node.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
