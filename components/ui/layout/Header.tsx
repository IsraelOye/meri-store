"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

export function Header() {
  const { cart } = useCart();
  const itemCount = cart?.totalQuantity ?? 0;

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-3xl shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/logo.png"
            alt="MeriStore logo"
            width={50}
            height={50}
          />
          <span className="text-xl font-bold text-[#111827] font-(family-name:--font-montserrat)">
            Meri<span className="text-[#f86624]">Store</span>
          </span>
        </Link>

        <Link href="/cart" className="relative flex items-center">
          <ShoppingCart className="h-7 w-7 text-[#111827]" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 flex items-center justify-center h-5 w-5 rounded-full bg-[#111827] text-[#f86624] text-xs">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
