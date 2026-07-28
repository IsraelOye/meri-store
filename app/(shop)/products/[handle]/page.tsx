import { notFound } from "next/navigation";
import {
  getProductByHandle,
  getProductRecommendations,
} from "@/services/products";
import { ProductGrid } from "@/components/ui/product/ProductGrid";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
// import { ProductGallery } from "@/components/ui/product/ProductGallery";
// import { ProductInfo } from "@/components/ui/product/ProductInfo";

const ProductGallery = dynamic(() =>
  import("@/components/ui/product/ProductGallery").then(
    (mod) => mod.ProductGallery,
  ),
);

const ProductInfo = dynamic(() =>
  import("@/components/ui/product/ProductInfo").then((mod) => mod.ProductInfo),
);

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: product.title,
    description: product.description || `Shop ${product.title} at MeriStore.`,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.images[0] ? [{ url: product.images[0].url }] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;

  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  const recommendations = await getProductRecommendations(product.id);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <ProductGallery images={product.images} productTitle={product.title} />
        <ProductInfo product={product} />
      </div>

      {recommendations.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            You might also like
          </h2>
          <ProductGrid products={recommendations} />
        </section>
      )}
    </main>
  );
}