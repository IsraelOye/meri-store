import { getProducts } from "@/services/products";
import { ProductGrid } from "@/components/ui/product/ProductGrid";
import Link from 'next/link';

interface HomePageProps {
  searchParams: Promise<{ after?: string }>;
}

export default async function HomePage({ searchParams}: HomePageProps) {
  const { after } = await searchParams;
  const { products, pageInfo } = await getProducts(12, after);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">All Products</h1>
      <ProductGrid products={products} />

      {pageInfo.hasNextPage && (
        <div className="mt-10 text-center">
          <Link
            href={`/?after=${pageInfo.endCursor}`}
            className="inline-block px-6 py-3 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50"
          >
            Load More
          </Link>
        </div>
      )}
    </main>
  );
}
