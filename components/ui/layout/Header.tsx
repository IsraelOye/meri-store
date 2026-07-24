"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function Header() {
  const { cart } = useCart();
  const itemCount = cart?.totalQuantity ?? 0;

  return (
    <header className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-gray-900">
          MeriStore
        </Link>

        <Link href="/cart" className="relative flex items-center">
          <ShoppingCart className="h-6 w-6 text-gray-700" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 flex items-center justify-center h-5 w-5 rounded-full bg-gray-900 text-white text-xs">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
