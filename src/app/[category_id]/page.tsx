import ProductsClientPage from "@/features/products/components/ProductsClientPage";

type Search = { page?: string; limit?: string };
type Props = { params: { category_id: string }; searchParams: Promise<Search> };

export function generateMetadata({ params }: Props) {
  return { title: `Category ${params.category_id} | Meli Store` };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const sp = await searchParams;
  const page = Number(sp?.page ?? 1);
  const limit = Number(sp?.limit ?? 10);

  return (
    <>
      <h2 className="mb-2 text-base font-semibold">
        Category: {params.category_id}
      </h2>
      <ProductsClientPage
        page={page}
        limit={limit}
        categoryId={params.category_id}
      />
    </>
  );
}
