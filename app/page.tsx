import { getCollections, getProductsByCollection, getProducts } from "@/services/products";
import { ProductGrid } from "@/components/ui/product/ProductGrid";
import Link from "next/link";
import BackButton from "@/components/ui/product/BackButton";
import { SearchInput } from "@/components/ui/product/SearchInput";
import { SortSelect } from "@/components/ui/product/SortSelect";
import { CollectionFilter } from "@/components/ui/product/CollectionFilter";
import { AvailabilityFilter } from "@/components/ui/product/AvailabilityFilter";
// import { PriceFilter } from "@/components/ui/product/PriceFilter";

interface HomePageProps {
  searchParams: Promise<{
    after?: string;
    q?: string;
    sort?: string;
    collection?: string;
    available?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { after, q, sort, collection, available, minPrice, maxPrice } =
    await searchParams;

  const queryParts: string[] = [];
  if (q) queryParts.push(`title:*${q}*`);
  // if (collection) queryParts.push(`collection:${collection}`);
  if (available === "true") queryParts.push(`available_for_sale:true`);
  if (minPrice) queryParts.push(`variants.price:>=${minPrice}`);
  if (maxPrice) queryParts.push(`variants.price:<=${maxPrice}`);
  const shopifyQuery =
    queryParts.length > 0 ? queryParts.join(" AND ") : undefined;

  const [sortKey, reverseStr] = (sort ?? "RELEVANCE-false").split("-");
  const reverse = reverseStr === "true";

  // const [{ products, pageInfo }, collections] = await Promise.all([
  //   getProducts({
  //     first: 12,
  //     after,
  //     query: shopifyQuery,
  //     sortKey: sortKey as "RELEVANCE" | "PRICE" | "CREATED_AT" | "BEST_SELLING",
  //     reverse,
  //   }),
  //   getCollections(),
  // ]);

  const [{ products, pageInfo }, collections] = await Promise.all([
    collection
      ? getProductsByCollection({ first: 12, after, handle: collection })
      : getProducts({
          first: 12,
          after,
          query: shopifyQuery, // now built WITHOUT the collection: part
          sortKey: sortKey as
            | "RELEVANCE"
            | "PRICE"
            | "CREATED_AT"
            | "BEST_SELLING",
          reverse,
        }),
    getCollections(),
  ]);

  const paginationQuery = [
    q && `q=${q}`,
    sort && `sort=${sort}`,
    collection && `collection=${collection}`,
    available && `available=${available}`,
    minPrice && `minPrice=${minPrice}`,
    maxPrice && `maxPrice=${maxPrice}`,
  ]
    .filter(Boolean)
    .join("&");

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-10">
      <div className="flex flex-col gap-4 mb-6">
        <h1 className="text-2xl font-bold">All Products</h1>
        <div className="flex flex-wrap items-center gap-3">
          <SearchInput />
          <SortSelect />
          <CollectionFilter collections={collections} />
          <AvailabilityFilter />
          {/* <PriceFilter /> */}
        </div>
      </div>

      {after && <BackButton />}
      <ProductGrid products={products} />

      {pageInfo.hasNextPage && (
        <div className="mt-10 text-center">
          <Link
            href={`/?after=${pageInfo.endCursor}${paginationQuery ? `&${paginationQuery}` : ""}`}
            className="inline-block px-6 py-2 border border-gray-300 rounded-md text-base font-medium bg-black text-white"
          >
            Load More
          </Link>
        </div>
      )}
    </main>
  );
}