import { NextRequest, NextResponse } from "next/server";
import type { Product, ProductsResponse } from "@/lib/types";

const BASE = "https://dummyjson.com";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const q = url.searchParams.get("q") || "";
    const category = url.searchParams.get("category") || "";
    const limit = Math.max(
      1,
      Math.min(50, Number(url.searchParams.get("limit") || "10"))
    );
    const page = Math.max(1, Number(url.searchParams.get("page") || "1"));
    const minPrice = Number(url.searchParams.get("minPrice") || "0");
    const maxPrice = Number(url.searchParams.get("maxPrice") || "999999");
    const skip = (page - 1) * limit;

    let upstream = "";
    if (category) {
      upstream = `${BASE}/products/category/${encodeURIComponent(
        category
      )}?limit=${limit}&skip=${skip}`;
    } else if (q) {
      upstream = `${BASE}/products/search?q=${encodeURIComponent(
        q
      )}&limit=${limit}&skip=${skip}`;
    } else {
      upstream = `${BASE}/products?limit=${limit}&skip=${skip}`;
    }

    const res = await fetch(upstream, {
      headers: { "User-Agent": "InterviewApp/1.0" },
      cache: "no-store",
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      return NextResponse.json<ProductsResponse>(
        { ok: false, paging: { total: 0, page, limit }, products: [] },
        { status: res.status, statusText: errText || res.statusText }
      );
    }

    const data = (await res.json()) as {
      products: Product[];
      total: number;
      skip: number;
      limit: number;
    };

    const filtered = data.products.filter(
      (p) =>
        typeof p.price === "number" &&
        p.price >= minPrice &&
        p.price <= maxPrice
    );

    return NextResponse.json<ProductsResponse>({
      ok: true,
      paging: { total: data.total, page, limit },
      products: filtered,
    });
  } catch {
    return NextResponse.json<ProductsResponse>(
      { ok: false, paging: { total: 0, page: 1, limit: 10 }, products: [] },
      { status: 500 }
    );
  }
}
