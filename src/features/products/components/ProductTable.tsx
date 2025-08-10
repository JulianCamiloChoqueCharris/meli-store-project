"use client";

import Image from "next/image";
import { ProductRow } from "../types";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "primereact/button";
import { Skeleton } from "primereact/skeleton";

type Props = {
  rows: ProductRow[];
  loading?: boolean;
};

export default function ProductTable({ rows, loading }: Props) {
  const router = useRouter();
  const search = useSearchParams();
  const [isLoading, setIsLoading] = useState(!!loading);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(t);
  }, [search.toString()]);

  if (isLoading) {
    return (
      <div role="status" aria-live="polite" className="space-y-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-12 items-center gap-3 rounded-xl border p-3"
          >
            <Skeleton className="col-span-2 h-16 w-16 rounded-lg" />
            <Skeleton className="col-span-6 h-4" />
            <Skeleton className="col-span-2 h-4" />
            <Skeleton className="col-span-2 h-10" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div role="table" aria-label="Products table" className="space-y-2">
      {rows.map((p) => (
        <div
          key={p.id}
          role="row"
          className="grid grid-cols-12 items-center gap-3 rounded-xl border p-3 hover:bg-gray-50"
        >
          <div role="cell" className="col-span-3 sm:col-span-2">
            <a
              href={p.permalink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${p.title} on Mercado Libre`}
            >
              <Image
                src={p.imageUrl}
                alt={p.title}
                width={96}
                height={96}
                className="h-16 w-16 rounded-lg object-cover"
                loading="lazy"
              />
            </a>
          </div>

          <div role="cell" className="col-span-9 sm:col-span-6">
            <a
              href={p.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="line-clamp-2 font-medium hover:underline"
            >
              {p.title}
            </a>
            <p className="mt-1 text-sm text-gray-500">
              Category: {p.categoryId}
            </p>
          </div>

          <div role="cell" className="col-span-6 sm:col-span-2">
            <span className="text-sm font-semibold">{p.priceLabel}</span>
          </div>

          <div
            role="cell"
            className="col-span-6 sm:col-span-2 flex justify-end"
          >
            <Button
              label="Open"
              icon="pi pi-external-link"
              onClick={() => window.open(p.permalink, "_blank", "noopener")}
              aria-label={`Open ${p.title} on Mercado Libre`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
