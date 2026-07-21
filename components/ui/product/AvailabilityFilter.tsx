"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function AvailabilityFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const inStockOnly = searchParams.get("available") === "true";

  function handleChange(checked: boolean) {
    const params = new URLSearchParams(searchParams.toString());

    if (checked) {
      params.set("available", "true");
    } else {
      params.delete("available");
    }

    params.delete("after");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id="in-stock"
        checked={inStockOnly}
        onCheckedChange={handleChange}
        className="cursor-pointer"
      />
      <Label htmlFor="in-stock" className="text-sm font-normal cursor-pointer">
        In stock only
      </Label>
    </div>
  );
}