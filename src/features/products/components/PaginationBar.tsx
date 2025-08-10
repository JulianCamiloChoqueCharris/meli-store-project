"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useMemo } from "react";

type Props = {
  page: number;
  totalPages: number;
  limit: number;
};

export default function PaginationBar({ page, totalPages, limit }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();

  const limits = useMemo(
    () => [10, 20, 30, 50].map((v) => ({ label: `${v} / page`, value: v })),
    []
  );

  const goTo = (nextPage: number, nextLimit = limit) => {
    const params = new URLSearchParams(search.toString());
    params.set("page", String(nextPage));
    params.set("limit", String(nextLimit));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <Button
          icon="pi pi-angle-left"
          label="Prev"
          onClick={() => goTo(Math.max(1, page - 1))}
          disabled={page <= 1}
        />
        <span className="text-sm" aria-live="polite">
          Page <strong>{page}</strong> of <strong>{totalPages}</strong>
        </span>
        <Button
          iconPos="right"
          icon="pi pi-angle-right"
          label="Next"
          onClick={() => goTo(Math.min(totalPages, page + 1))}
          disabled={page >= totalPages}
        />
      </div>

      <Dropdown
        aria-label="Items per page"
        value={limit}
        options={limits}
        onChange={(e) => goTo(1, e.value)}
        className="w-40"
      />
    </div>
  );
}
