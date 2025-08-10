/* import ProductsClientPage from "@/features/products/components/ProductsClientPage";

type Search = { page?: string; limit?: string };

export function generateMetadata({
  params,
}: {
  params: { category_id: string };
}) {
  return { title: `Category ${params.category_id} | Meli Store` };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category_id: string }>;
  searchParams: Promise<Search>;
}) {
  const p = await params;
  const sp = await searchParams;
  const page = Number(sp?.page ?? 1);
  const limit = Number(sp?.limit ?? 10);

  return (
    <>
      <h2 className="mb-2 text-base font-semibold">
        Category: {p.category_id}
      </h2>
      <ProductsClientPage
        page={page}
        limit={limit}
        categoryId={p.category_id}
      />
    </>
  );
}
 */

export default function CategoryPage() {
  return (
    <>
      <h2 className="mb-2 text-base font-semibold">Category: </h2>
    </>
  );
}
