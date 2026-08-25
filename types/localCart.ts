export interface LocalCartLine {
  variantId: string;
  quantity: number;
  variantTitle: string;
  price: { amount: string; currencyCode: string };
  productTitle: string;
  productHandle: string;
  image: { url: string; altText: string | null } | null;
}