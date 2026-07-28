"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";

export function SearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const debouncedSearch = useDebounce(search, 400);

//   useEffect(() => {
//     if (isFirstRender.current) {
//         isFirstRender.current = false;
//         return;
//     }
    
//     const params = new URLSearchParams(searchParams.toString());

//     if (debouncedSearch) {
//       params.set("q", debouncedSearch);
//     } else {
//       params.delete("q");
//     }

//     params.delete("after"); // reset pagination on new search

//     router.push(`${pathname}?${params.toString()}`);
//   }, [debouncedSearch]);

 useEffect(() => {
   const currentQ = searchParams.get("q") ?? "";

   // Only push if the debounced value is actually different from the URL's current value
   if (debouncedSearch === currentQ) {
     return;
   }

   const params = new URLSearchParams(searchParams.toString());

   if (debouncedSearch) {
     params.set("q", debouncedSearch);
   } else {
     params.delete("q");
   }

   params.delete("after");

   router.push(`${pathname}?${params.toString()}`);
 }, [debouncedSearch]);

  return (
    <Input
      type="text"
      placeholder="Search products..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="max-w-sm"
    />
  );
}