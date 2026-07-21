import { getCollections, getProducts } from "@/services/products";
import { ProductGrid } from "@/components/ui/product/ProductGrid";
import Link from 'next/link';
import BackButton from "@/components/ui/product/BackButton";
import { SearchInput } from "@/components/ui/product/SearchInput";
import { SortSelect } from "@/components/ui/product/SortSelect";

interface HomePageProps {
  searchParams: Promise<{ after?: string; q?: string; sort?: string }>;
}

export default async function HomePage({ searchParams}: HomePageProps) {
  const { after, q, sort } = await searchParams;

  const shopifyQuery = q ? `title:*${q}*` : undefined;

  const [sortKey, reverseStr] = (sort ?? "RELEVANCE-false").split("-");
  const reverse = reverseStr === "true";

  const [{ products, pageInfo }, collections] = await Promise.all([
    getProducts({
      first: 12,
      after,
      query: shopifyQuery,
      sortKey: sortKey as "RELEVANCE" | "PRICE" | "CREATED_AT" | "BEST_SELLING",
      reverse,
    }),
    getCollections(),
  ]);

  const paginationQuery = `${q ? `&q=${q}` : ""}${sort ? `&sort=${sort}` : ""}`;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* <h1 className="text-2xl font-bold text-gray-900 mb-6">All Products</h1> */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
        <SearchInput />
        <SortSelect />
      </div>
      {after && <BackButton />}
      <ProductGrid products={products} />

      {pageInfo.hasNextPage && (
        <div className="mt-10 text-center">
          <Link
            href={`/?after=${pageInfo.endCursor}${paginationQuery}`}
            className="inline-block px-6 py-3 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50"
          >
            Load More
          </Link>
        </div>
      )}
    </main>
  );
}
