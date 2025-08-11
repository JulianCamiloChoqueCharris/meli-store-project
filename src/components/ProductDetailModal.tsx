"use client";

import useSWR from "swr";
import { Dialog } from "primereact/dialog";
import { Galleria } from "primereact/galleria";
import { Tag } from "primereact/tag";
import { Rating } from "primereact/rating";
import { Button } from "primereact/button";
import { Skeleton } from "primereact/skeleton";
import { getJSON } from "@/lib/api";
import type { Product } from "@/lib/types";
import Image from "next/image";

type DetailResponse = { ok: boolean; product: Product };

type Props = {
  productId: number | null;
  visible: boolean;
  onHide: () => void;
};

export default function ProductDetailModal({
  productId,
  visible,
  onHide,
}: Props) {
  const { data, isLoading } = useSWR<DetailResponse>(
    visible && productId ? `/api/products/${productId}` : null,
    getJSON,
    { revalidateOnFocus: false }
  );

  const p = data?.product;

  const footer = (
    <div className="flex justify-end gap-2 p-4">
      <Button
        label="Cerrar"
        severity="secondary"
        onClick={onHide}
        className="border-2 !border-[#303172] !text-[#303172] hover:!bg-[#303172] hover:!text-white h-[40px] w-28 py-1 px-2 box-border rounded-lg gap-2 text-base"
      />
      {p && (
        <a
          href={`https://dummyjson.com/products/${p.id}`}
          target="_blank"
          rel="noreferrer"
        >
          <Button
            label="Ver en sitio"
            icon="pi pi-external-link"
            outlined
            className="border-2 !border-[#303172] !text-[#303172] hover:!bg-[#303172] hover:!text-white h-[40px] w-[180px] py-1 px-2 box-border rounded-lg gap-2 text-base"
          />
        </a>
      )}
    </div>
  );

  const itemTemplate = (img: string) => (
    <div className="relative w-full h-80">
      <Image
        src={img}
        alt="Imagen"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-contain"
        priority={false}
      />
    </div>
  );

  const thumbTemplate = (img: string) => (
    <div className="relative w-16 h-16">
      <Image
        src={img}
        alt="Thumb"
        fill
        sizes="64px"
        className="object-cover rounded"
      />
    </div>
  );

  return (
    <Dialog
      header={""}
      visible={visible}
      onHide={onHide}
      footer={footer}
      dismissableMask
      modal
      className="w-[90dvw] max-w-[1080px]"
    >
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5">
          <div>
            <Skeleton height="20rem" />
          </div>
          <div className="space-y-3">
            <Skeleton width="60%" height="1.2rem" />
            <Skeleton width="40%" height="1.2rem" />
            <Skeleton height="6rem" />
            <div className="grid grid-cols-2 gap-2">
              <Skeleton height="2rem" />
              <Skeleton height="2rem" />
              <Skeleton height="2rem" />
              <Skeleton height="2rem" />
            </div>
          </div>
        </div>
      )}

      {!isLoading && p && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5">
          <div>
            <div className="border-2 border-[#030300] rounded-md">
              <Galleria
                value={p.images ?? ([p.thumbnail].filter(Boolean) as string[])}
                numVisible={4}
                circular
                showThumbnails
                showIndicators={false}
                item={itemTemplate}
                thumbnail={thumbTemplate}
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col">
                <span className="text-xs text-[#737373]">ID: {p.id}</span>
                <h2 className="text-xl font-semibold text-[#030300]">
                  {p.title}
                </h2>
                <span className="text-sm text-[#737373]">
                  Categoría: {p.category}
                </span>
              </div>
              <Tag
                value={p.brand ?? "Genérico"}
                severity="info"
                className="whitespace-nowrap p-1.5 box-border"
              />
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-[#030300]">
                $
                {Intl.NumberFormat("es-AR", {
                  minimumFractionDigits: 2,
                }).format(p.price)}
              </span>
              <div className="flex items-center gap-2">
                <Rating
                  value={Math.round((p.rating as number) || 0)}
                  readOnly
                  cancel={false}
                />
                <span className="text-sm text-[#737373]">
                  {p.rating ?? 0}/5
                </span>
              </div>
            </div>

            <p className="text-sm text-[#030300]">{p.description}</p>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg border p-3">
                <span className="block text-[#737373]">Stock</span>
                <span className="font-semibold">{p.stock ?? 0} unidades</span>
              </div>
              {p?.dimensions && (
                <div className="rounded-lg border p-3">
                  <span className="block text-[#737373]">Dimensiones</span>
                  <span className="font-semibold">
                    {p.dimensions.width} × {p.dimensions.height} ×{" "}
                    {p.dimensions.depth}
                  </span>
                </div>
              )}
              {p?.warrantyInformation && (
                <div className="rounded-lg border p-3 col-span-2">
                  <span className="block text-[#737373]">Garantía</span>
                  <span className="font-semibold">{p.warrantyInformation}</span>
                </div>
              )}
              {p?.shippingInformation && (
                <div className="rounded-lg border p-3 col-span-2">
                  <span className="block text-[#737373]">Envío</span>
                  <span className="font-semibold">{p.shippingInformation}</span>
                </div>
              )}
            </div>

            {Array.isArray(p.reviews) && p.reviews.length > 0 && (
              <div className="rounded-lg border p-3">
                <h3 className="text-sm font-semibold mb-2">Opiniones</h3>
                <ul className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {p.reviews.slice(0, 5).map((r, idx) => (
                    <li key={idx} className="text-sm">
                      <div className="flex items-center gap-2">
                        <Rating value={r.rating} readOnly cancel={false} />
                        {r.reviewerName && (
                          <span className="text-[#737373]">
                            {r.reviewerName}
                          </span>
                        )}
                      </div>
                      <p className="text-[#030300]">{r.comment}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </Dialog>
  );
}
