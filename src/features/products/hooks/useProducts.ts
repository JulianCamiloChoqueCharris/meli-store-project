"use client";

import useSWR from "swr";

export type MeliSearchItem = {
  id: string;
  title: string;
  price: number;
  currency_id: string;
  thumbnail: string;
  permalink: string;
  category_id: string;
};
export type MeliSearchResponse = {
  paging: { total: number; offset: number; limit: number };
  results: MeliSearchItem[];
};

const SELLER_ID = "179571326";

const fetcher = async (url: string) => {
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<MeliSearchResponse>;
};

export function useProducts(page: number, limit: number, categoryId?: string) {
  const offset = (Math.max(1, page) - 1) * limit;

  const url = new URL("https://api.mercadolibre.com/sites/MCO/search");
  url.searchParams.set("seller_id", SELLER_ID);
  url.searchParams.set("offset", String(offset));
  url.searchParams.set("limit", String(limit));
  if (categoryId) url.searchParams.set("category", categoryId);

  const { data, error, isLoading, mutate } = useSWR(url.toString(), fetcher, {
    keepPreviousData: true,
    revalidateOnFocus: true,
  });

  const rows =
    data?.results.map((r) => ({
      id: r.id,
      title: r.title,
      priceLabel: new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: r.currency_id || "ARS",
        maximumFractionDigits: 0,
      }).format(r.price),
      imageUrl: r.thumbnail,
      permalink: r.permalink,
      categoryId: r.category_id,
    })) ?? [];

  const total = data?.paging.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return { rows, total, totalPages, isLoading, error, mutate };
}
