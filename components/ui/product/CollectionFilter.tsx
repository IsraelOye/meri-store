"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Collection {
  id: string;
  handle: string;
  title: string;
}

interface CollectionFilterProps {
  collections: Collection[];
}

export function CollectionFilter({ collections }: CollectionFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCollection = searchParams.get("collection") ?? "all";

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete("collection");
    } else {
      params.set("collection", value);
    }

    params.delete("after");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <Select value={currentCollection} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Collection" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Collections</SelectItem>
        {collections.map((collection) => (
          <SelectItem key={collection.id} value={collection.handle}>
            {collection.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}