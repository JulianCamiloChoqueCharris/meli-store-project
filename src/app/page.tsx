import { Suspense } from "react";
import ProductsTable from "@/components/ProductsTable";

export default function HomePage() {
  return (
    <main className="p-3">
      <Suspense fallback={<div className="p-3">Cargando productos…</div>}>
        <ProductsTable />
      </Suspense>
    </main>
  );
}
