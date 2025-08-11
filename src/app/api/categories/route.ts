import { NextResponse } from "next/server";
import type { CategoriesResponse } from "@/lib/types";

const BASE = "https://dummyjson.com";

export async function GET() {
  try {
    const res = await fetch(`${BASE}/products/categories`, {
      headers: { "User-Agent": "InterviewApp/1.0" },
      cache: "force-cache",
    });

    if (!res.ok) {
      return NextResponse.json<CategoriesResponse>(
        { ok: false, categories: [] },
        { status: res.status }
      );
    }

    const raw = await res.json();

    let categories: string[] = [];
    if (Array.isArray(raw) && raw.length > 0) {
      if (typeof raw[0] === "string") {
        categories = raw as string[];
      } else if (typeof raw[0] === "object") {
        categories = (raw as Array<{ slug?: string; name?: string }>)
          .map((c) => c.slug || c.name || "")
          .filter(Boolean);
      }
    }

    return NextResponse.json<CategoriesResponse>({ ok: true, categories });
  } catch {
    return NextResponse.json<CategoriesResponse>(
      { ok: false, categories: [] },
      { status: 500 }
    );
  }
}
