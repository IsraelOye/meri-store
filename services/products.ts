import { shopifyFetch } from "@/lib/shopify/client";
import { PRODUCTS_QUERY, COLLECTIONS_QUERY } from "@/lib/shopify/queries";

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