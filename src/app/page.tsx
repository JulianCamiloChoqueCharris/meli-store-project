import ProductsClientPage from "@/features/products/components/ProductsClientPage";

type Search = { page?: string; limit?: string };

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const sp = await searchParams;
  const page = Number(sp?.page ?? 1);
  const limit = Number(sp?.limit ?? 10);

  return (
    <>
      <h2 className="mb-2 text-base font-semibold">All products</h2>
      <ProductsClientPage page={page} limit={limit} />
    </>
  );
}
