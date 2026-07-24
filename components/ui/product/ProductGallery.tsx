"use client";

import { useState } from "react";
import Image from "next/image";

interface GalleryImage {
  url: string;
  altText: string | null;
}

interface ProductGalleryProps {
  images: GalleryImage[];
  productTitle: string;
}

export function ProductGallery({ images, productTitle }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
        No image available
      </div>
    );
  }

  const activeImage = images[activeIndex];

  return (
    <div>
      <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={activeImage.url}
          alt={activeImage.altText ?? productTitle}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
          priority
        />
      </div>

      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-5 gap-2">
          {images.map((image, index) => (
            <button
              key={image.url}
              onClick={() => setActiveIndex(index)}
              className={`aspect-square relative rounded-md overflow-hidden border-2 ${
                index === activeIndex ? "border-gray-900" : "border-transparent"
              }`}
            >
              <Image
                src={image.url}
                alt={image.altText ?? `${productTitle} thumbnail ${index + 1}`}
                fill
                sizes="20vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
