"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductVariant, ProductOption } from "@/services/products";

interface VariantSelectorProps {
  options: ProductOption[];
  variants: ProductVariant[];
  onVariantChange: (variant: ProductVariant | undefined) => void;
}

export function VariantSelector({
  options,
  variants,
  onVariantChange,
}: VariantSelectorProps) {
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >(() => {
    // Default to the first value of each option
    const initial: Record<string, string> = {};
    options.forEach((option) => {
      initial[option.name] = option.values[0];
    });
    return initial;
  });

  function handleSelect(optionName: string, value: string) {
    const updated = { ...selectedOptions, [optionName]: value };
    setSelectedOptions(updated);

    // Find the variant that matches ALL currently selected options
    const matchedVariant = variants.find((variant) =>
      variant.selectedOptions.every((opt) => updated[opt.name] === opt.value),
    );

    onVariantChange(matchedVariant);
  }

  // Don't render a picker at all for single-variant products with no real options
  const hasRealOptions = options.some((opt) => opt.name !== "Title");
  if (!hasRealOptions) {
    return null;
  }

  return (
    <div className="space-y-4">
      {options.map((option) => (
        <div key={option.id}>
          <p className="text-sm font-medium text-gray-900 mb-2">
            {option.name}
          </p>
          <div className="flex flex-wrap gap-2">
            {option.values.map((value) => (
              <Button
                key={value}
                variant={
                  selectedOptions[option.name] === value ? "default" : "outline"
                }
                size="sm"
                onClick={() => handleSelect(option.name, value)}
              >
                {value}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
