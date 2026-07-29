"use client";

import { useState } from "react";
import { VariantSelector } from "./VariantSelector";
import { ProductDetail, ProductVariant } from "@/services/products";
import { Button } from "../button";
import { useCart } from "@/context/CartContext";
import BackButton from "@/components/ui/product/BackButton";

interface ProductInfoProps {
  product: ProductDetail;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedVariant, setSelectedVariant] = useState<
    ProductVariant | undefined
  >(product.variants[0]);
  const [adding, setAdding] = useState(false);

  const { addItem, error } = useCart();

  const displayPrice = selectedVariant?.price ?? product.variants[0]?.price;

  async function handleAddToCart() {
    if (!selectedVariant) return;

    setAdding(true);
    await addItem(selectedVariant.id, 1);
    setAdding(false);
  }

  return (
    <div>
      {/* <BackButton /> */}
      <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>

      {displayPrice && (
        <p className="mt-2 text-xl text-gray-900">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: displayPrice.currencyCode,
          }).format(parseFloat(displayPrice.amount))}
        </p>
      )}

      <p className="mt-4 text-gray-600">{product.description}</p>

      <div className="mt-6">
        <VariantSelector
          options={product.options}
          variants={product.variants}
          onVariantChange={setSelectedVariant}
        />
      </div>

      <div className="mt-6">
        {selectedVariant?.availableForSale ? (
          <p className="text-sm text-green-600">In stock</p>
        ) : (
          <p className="text-sm text-red-600">Out of stock</p>
        )}
      </div>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <Button
        className="mt-6 w-full"
        size="lg"
        disabled={!selectedVariant?.availableForSale || adding}
        onClick={handleAddToCart}
      >
        {adding
          ? "Adding..."
          : selectedVariant?.availableForSale
            ? "Add to Cart"
            : "Out of Stock"}
      </Button>
    </div>
  );
}