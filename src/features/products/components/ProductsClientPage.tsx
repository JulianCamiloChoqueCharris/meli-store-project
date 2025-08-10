"use client";

import { useProducts } from "../hooks/useProducts";
import ProductTable from "./ProductTable";
import PaginationBar from "./PaginationBar";

type Props = { page: number; limit: number; categoryId?: string };

export default function ProductsClientPage({ page, limit, categoryId }: Props) {
  const { rows, total, totalPages, isLoading } = useProducts(
    page,
    limit,
    categoryId
  );

  return (
    <section className="flex flex-col gap-4">
      <ProductTable rows={rows} loading={isLoading} />
      <PaginationBar page={page} totalPages={totalPages} limit={limit} />
      <p className="text-xs text-gray-500">
        Total results: {total.toLocaleString()}
      </p>
    </section>
  );
}
