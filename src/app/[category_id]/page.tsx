import { Suspense } from "react";
import ProductsTable from "@/components/ProductsTable";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category_id: string }>;
}) {
  const { category_id } = await params;
  const category = decodeURIComponent(category_id ?? "");

  return (
    <main className="p-3">
      <Suspense fallback={<div className="p-3">Cargando productos…</div>}>
        <ProductsTable category={category} />
      </Suspense>
    </main>
  );
}
