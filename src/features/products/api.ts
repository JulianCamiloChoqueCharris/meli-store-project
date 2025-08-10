import { fetchJSON } from "@/lib/fetcher";
import type { MeliSearchResponse, ProductRow } from "./types";
import { getBaseUrl } from "@/lib/baseUrl";

const SELLER_ID = "179571326";
const BASE_INTERNAL = "/api/meli/search";

export type SearchParams = {
  limit?: number;
  page?: number;
  category_id?: string;
};

export async function getProducts(params: SearchParams = {}) {
  const limit = Number(params.limit ?? 10);
  const page = Math.max(1, Number(params.page ?? 1));
  const offset = (page - 1) * limit;

  const qs = new URLSearchParams();
  qs.set("seller_id", SELLER_ID);
  qs.set("offset", String(offset));
  qs.set("limit", String(limit));
  if (params.category_id) qs.set("category", params.category_id);

  const base = getBaseUrl();
  const url = `${base}${BASE_INTERNAL}?${qs.toString()}`;

  const data = await fetchJSON<MeliSearchResponse>(url, {
    revalidate: 60,
    nextTags: ["products", params.category_id ?? "all"],
  });

  const rows: ProductRow[] = data.results.map((r) => ({
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
  }));

  return {
    rows,
    total: data.paging.total,
    limit,
    page,
    totalPages: Math.max(1, Math.ceil(data.paging.total / limit)),
  };
}
