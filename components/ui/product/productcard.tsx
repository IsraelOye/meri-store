import Image from "next/image";
import Link from "next/link";
import { Product } from "@/services/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const price = parseFloat(product.priceRange.minVariantPrice.amount);
    const currency = product.priceRange.minVariantPrice.currencyCode;
  return (
    <Link href={`/products/${product.handle}`} className="group block">
      <div className="aspect-square relative bg-white rounded-lg overflow-hidden shadow-sm">
        {product.featuredImage ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText ?? product.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No image
          </div>
        )}
      </div>

      <div className="mt-3">
        <h3 className="text-sm font-medium text-gray-900">{product.title}</h3>
        <p className="mt-1 text-sm text-gray-600">
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency,
          }).format(price)}
        </p>
      </div>
    </Link>
  );
}   