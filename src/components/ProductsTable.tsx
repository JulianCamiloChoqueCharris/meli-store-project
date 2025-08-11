"use client";

import useSWR from "swr";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DataTable, DataTablePageEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Skeleton } from "primereact/skeleton";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { getJSON } from "@/lib/api";
import type { Product, ProductsResponse } from "@/lib/types";
import ProductDetailModal from "./ProductDetailModal";
import useIsMobile from "@/hooks/useIsMobile";
import Image from "next/image";

export default function ProductsTable({ category }: { category?: string }) {
  const isMobile = useIsMobile();
  const router = useRouter();
  const sp = useSearchParams();

  const page = Number(sp.get("page") || "1");
  const limit = Number(sp.get("limit") || (category ? "12" : "10"));
  const safeCategory = category && category !== "undefined" ? category : "";

  const qs = new URLSearchParams();
  qs.set("page", String(page));
  qs.set("limit", String(limit));
  if (safeCategory) qs.set("category", safeCategory);

  const { data, error, isLoading } = useSWR<ProductsResponse>(
    `/api/products?${qs.toString()}`,
    getJSON,
    { keepPreviousData: true }
  );

  const total = data?.paging.total ?? 0;
  const first = (page - 1) * limit;

  const goToPage = (nextPage: number, nextLimit = limit) => {
    const nsp = new URLSearchParams(sp.toString());
    nsp.set("page", String(nextPage));
    nsp.set("limit", String(nextLimit));
    const path = safeCategory ? `/${encodeURIComponent(safeCategory)}` : "/";
    router.push(`${path}?${nsp.toString()}`);
  };

  const onPageTable = (e: DataTablePageEvent) => {
    const nextPage = (e.page ?? 0) + 1;
    const nextLimit = e.rows ?? limit;
    goToPage(nextPage, nextLimit);
  };

  const onPageCards = (e: PaginatorPageChangeEvent) => {
    const nextPage = (e.page ?? 0) + 1;
    const nextLimit = e.rows ?? limit;
    goToPage(nextPage, nextLimit);
  };

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const skeletonRows = Array.from(
    { length: limit },
    (_, i) => ({ id: i + 1 } as Product)
  );

  const idBody = (p: Product) =>
    isLoading ? (
      <Skeleton width="4rem" height="1rem" />
    ) : (
      <div className="p-3">
        <span className="text-[#303172] font-semibold">{p.id}</span>
      </div>
    );

  const nameBody = (p: Product) =>
    isLoading ? (
      <div className="flex flex-col gap-1">
        <Skeleton width="14rem" height="1rem" />
        <Skeleton width="8rem" height="0.75rem" />
      </div>
    ) : (
      <div className="flex flex-col">
        <span className="text-[#030300] font-medium">{p.title}</span>
        <span className="text-xs text-[#737373]">Categoría: {p.category}</span>
      </div>
    );

  const priceBody = (p: Product) =>
    isLoading ? (
      <Skeleton width="6rem" height="1rem" />
    ) : (
      <span className="text-[#030300] font-semibold">
        $
        {Intl.NumberFormat("es-AR", { minimumFractionDigits: 2 }).format(
          p.price as number
        )}
      </span>
    );

  const actionsBody = (p: Product) =>
    isLoading ? (
      <Skeleton width="8rem" height="2rem" />
    ) : (
      <div className="flex gap-2">
        <Button
          label="Detalles"
          icon="pi pi-search"
          size="small"
          outlined
          onClick={() => {
            setSelectedId(p.id);
            setOpen(true);
          }}
          className="w-full sm:w-auto !border-[#303172] !text-[#303172] hover:!bg-[#303172] hover:!text-white py-1 px-2 box-border rounded-lg gap-2 text-base"
        />
      </div>
    );

  const imageBody = (p: Product) =>
    isLoading ? (
      <Skeleton width="3rem" height="3rem" className="!rounded" />
    ) : (
      <div className="relative w-16 h-16">
        <Image
          src={p.thumbnail || p.images?.[0] || "/placeholder.png"}
          alt={p.title}
          fill
          sizes="64px"
          className="object-cover rounded"
          priority={false}
        />
      </div>
    );

  const Card = ({ p }: { p: Product }) => (
    <article className="bg-white rounded-2xl border overflow-hidden">
      <div className="relative w-full aspect-square bg-gray-100">
        <Image
          src={p.thumbnail || p.images?.[0] || "/placeholder.png"}
          alt={p.title}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover"
          priority={false}
        />
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium text-[#030300] line-clamp-2">
          {p.title}
        </h3>
        <p className="text-xs text-[#737373] mb-2">{p.category}</p>
        <p className="text-lg font-bold text-[#030300] mb-3">
          $
          {Intl.NumberFormat("es-AR", { minimumFractionDigits: 2 }).format(
            p.price as number
          )}
        </p>
        <Button
          label="Detalles"
          icon="pi pi-search"
          onClick={() => {
            setSelectedId(p.id);
            setOpen(true);
          }}
          className="w-full sm:w-auto !border-[#303172] !text-[#303172] hover:!bg-[#303172] hover:!text-white py-1 px-2 box-border rounded-lg gap-2 text-base"
          outlined
        />
      </div>
    </article>
  );

  const CardSkeleton = () => (
    <article className="bg-white rounded-2xl border overflow-hidden">
      <Skeleton width="100%" height="10rem" />
      <div className="p-3 space-y-2">
        <Skeleton width="80%" height="1rem" />
        <Skeleton width="40%" height="0.8rem" />
        <Skeleton width="50%" height="1.2rem" />
        <Skeleton width="100%" height="2.25rem" />
      </div>
    </article>
  );

  return (
    <div className="w-full h-full overflow-x-hidden overflow-y-auto p-2">
      {error && (
        <div className="p-3 rounded border bg-red-50 text-red-700 mb-3">
          Error cargando productos
        </div>
      )}

      {isMobile ? (
        <>
          <section className="grid grid-cols-2 gap-3">
            {(isLoading ? skeletonRows : data?.products ?? []).map((p, i) =>
              isLoading ? <CardSkeleton key={i} /> : <Card key={p.id} p={p} />
            )}
          </section>

          <div className="mt-3">
            <Paginator
              first={first}
              rows={limit}
              totalRecords={total}
              rowsPerPageOptions={[6, 12, 24, 36]}
              onPageChange={onPageCards}
              template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            />
          </div>
        </>
      ) : (
        <DataTable
          value={isLoading ? skeletonRows : data?.products ?? []}
          loading={isLoading}
          paginator
          lazy
          rows={limit}
          first={first}
          totalRecords={total}
          onPage={onPageTable}
          stripedRows
          showGridlines
          emptyMessage={
            <div className="w-full p-3 text-center">Sin resultados</div>
          }
        >
          <Column
            header="Producto ID"
            body={idBody}
            headerClassName="bg-gray-50 text-left !py-4 !px-3 font-semibold text-gray-700"
            bodyClassName="align-middle py-2"
            style={{ width: "9rem" }}
          />
          <Column
            header="Nombre de producto"
            body={nameBody}
            headerClassName="bg-gray-50 text-left !py-4 !px-3 font-semibold text-gray-700"
            bodyClassName="align-middle"
          />
          <Column
            header="Precio"
            body={priceBody}
            headerClassName="bg-gray-50 text-left !py-4 !px-3 font-semibold text-gray-700"
            bodyClassName="align-middle"
            style={{ width: "10rem" }}
          />
          <Column
            header="Acciones"
            body={actionsBody}
            headerClassName="bg-gray-50 text-left !py-4 !px-3 font-semibold text-gray-700"
            bodyClassName="align-middle"
            style={{ width: "12rem" }}
          />
          <Column
            header="Imagen"
            body={imageBody}
            headerClassName="bg-gray-50 text-left !py-4 !px-3 font-semibold text-gray-700"
            bodyClassName="align-middle"
            style={{ width: "7.5rem" }}
          />
        </DataTable>
      )}

      <ProductDetailModal
        productId={selectedId}
        visible={open}
        onHide={() => setOpen(false)}
      />
    </div>
  );
}
