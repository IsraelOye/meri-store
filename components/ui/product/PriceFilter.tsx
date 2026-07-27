"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function PriceFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") ?? "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") ?? "");

  function applyFilter() {
    const params = new URLSearchParams(searchParams.toString());

    if (minPrice) {
      params.set("minPrice", minPrice);
    } else {
      params.delete("minPrice");
    }

    if (maxPrice) {
      params.set("maxPrice", maxPrice);
    } else {
      params.delete("maxPrice");
    }

    params.delete("after");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-2">
      <Input
        type="number"
        placeholder="Min"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="w-20"
        min={0}
      />
      <span className="text-gray-400">–</span>
      <Input
        type="number"
        placeholder="Max"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="w-20"
        min={0}
      />
      <Button size="sm" variant="outline" onClick={applyFilter}>
        Apply
      </Button>
    </div>
  );
}