import { getCollections, getProducts } from "@/services/products";
import { ProductGrid } from "@/components/ui/product/ProductGrid";
import Link from 'next/link';
import BackButton from "@/components/ui/product/BackButton";
import { SearchInput } from "@/components/ui/product/SearchInput";
import { SortSelect } from "@/components/ui/product/SortSelect";
import { CollectionFilter } from "@/components/ui/product/CollectionFilter";
import { AvailabilityFilter } from "@/components/ui/product/AvailabilityFilter";


interface HomePageProps {
  searchParams: Promise<{
    after?: string;
    q?: string;
    sort?: string;
    collection?: string;
    available?: string;
  }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { after, q, sort, collection, available } = await searchParams;

  // Build Shopify search syntax by combining every active filter
  const queryParts: string[] = [];
  if (q) queryParts.push(`title:*${q}*`);
  if (collection) queryParts.push(`collection:${collection}`);
  if (available === "true") queryParts.push(`available_for_sale:true`);
  const shopifyQuery =
    queryParts.length > 0 ? queryParts.join(" AND ") : undefined;

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

  const paginationQuery = [
    q && `q=${q}`,
    sort && `sort=${sort}`,
    collection && `collection=${collection}`,
    available && `available=${available}`,
  ]
    .filter(Boolean)
    .join("&");

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
        <div className="flex flex-wrap items-center gap-3">
          <SearchInput />
          <SortSelect />
          <CollectionFilter collections={collections} />
          <AvailabilityFilter />
        </div>
      </div>

      {after && <BackButton />}
      <ProductGrid products={products} />

      {pageInfo.hasNextPage && (
        <div className="mt-10 text-center">
          <Link
            href={`/?after=${pageInfo.endCursor}${paginationQuery ? `&${paginationQuery}` : ""}`}
            className="inline-block px-6 py-3 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50"
          >
            Load More
          </Link>
        </div>
      )}
    </main>
  );
}