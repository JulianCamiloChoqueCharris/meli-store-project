import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    headers: { "User-Agent": "InterviewApp/1.0" },
    cache: "no-store",
  });

  if (!res.ok) {
    return NextResponse.json({ ok: false }, { status: res.status });
  }
  const data = await res.json();
  return NextResponse.json({ ok: true, product: data });
}
