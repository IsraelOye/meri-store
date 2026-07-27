import { shopifyFetch } from "@/lib/shopify/client";
import { PRODUCTS_QUERY, COLLECTIONS_QUERY, PRODUCT_BY_HANDLE_QUERY, PRODUCT_RECOMMENDATIONS_QUERY } from "@/lib/shopify/queries";

export interface Product {
  id: string;
  handle: string;
  title: string;
  featuredImage: {
    url: string;
    altText: string | null;
  } | null;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
}

interface ProductsResponse {
  products: {
    edges: { node: Product }[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
  };
}

interface Collection {
  id: string;
  handle: string;
  title: string;
}

interface CollectionsResponse {
  collections: {
    edges: { node: Collection }[];
  };
}

interface GetProductsParams {
    first?: number;
    after?: string;
    query?: string;
    sortKey?: 'TITLE' | 'PRICE' | 'CREATED_AT' | 'BEST_SELLING' | 'RELEVANCE';
    reverse?: boolean;
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: {
    amount: string;
    currencyCode: string;
  };
  selectedOptions: {
    name: string;
    value: string;
  }[];
}

export interface ProductOption {
  id: string;
  name: string;
  values: string[];
}

export interface ProductDetail {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  images: {
    url: string;
    altText: string | null;
  }[];
  variants: ProductVariant[];
  options: ProductOption[];
}

interface ProductByHandleResponse {
  product: {
    id: string;
    handle: string;
    title: string;
    description: string;
    descriptionHtml: string;
    availableForSale: boolean;
    images: { edges: { node: { url: string; altText: string | null } }[] };
    variants: { edges: { node: ProductVariant }[] };
    options: ProductOption[];
  } | null;
}

export async function getProductByHandle(handle: string): Promise<ProductDetail | null> {
  const data = await shopifyFetch<ProductByHandleResponse>({
    query: PRODUCT_BY_HANDLE_QUERY,
    variables: { handle },
  });

  if (!data.product) {
    return null;
  }

  return {
    ...data.product,
    images: data.product.images.edges.map((edge) => edge.node),
    variants: data.product.variants.edges.map((edge) => edge.node),
  };
}

export async function getProducts({
  first = 12,
  after,
  query,
  sortKey = 'RELEVANCE',
  reverse = false,
}: GetProductsParams = {}) {
  const data = await shopifyFetch<ProductsResponse>({
    query: PRODUCTS_QUERY,
    variables: { first, after, query, sortKey, reverse },
  });

  return {
    products: data.products.edges.map((edge) => edge.node),
    pageInfo: data.products.pageInfo,
  };
}

export async function getCollections(first: number = 10) {
  const data = await shopifyFetch<CollectionsResponse>({
    query: COLLECTIONS_QUERY,
    variables: { first },
  });

  return data.collections.edges.map((edge) => edge.node);
}

export async function getProductRecommendations(productId: string) {
  const data = await shopifyFetch<{ productRecommendations: Product[] }>({
    query: PRODUCT_RECOMMENDATIONS_QUERY,
    variables: { productId },
  });

  return data.productRecommendations;
}