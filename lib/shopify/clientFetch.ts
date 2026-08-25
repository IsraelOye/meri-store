// lib/shopify/clientFetch.ts
'use client';

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_PUBLIC_TOKEN;

const endpoint = `https://${domain}/api/2025-01/graphql.json`;

interface ShopifyFetchParams {
  query: string;
  variables?: Record<string, unknown>;
}

interface ShopifyGraphQLResponse<T> {
  data: T;
  errors?: { message: string }[];
}

export async function shopifyClientFetch<T>({
  query,
  variables,
}: ShopifyFetchParams): Promise<T> {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token as string,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Shopify API error (${res.status}): ${text}`);
  }

  const json: ShopifyGraphQLResponse<T> = await res.json();

  if (json.errors && json.errors.length > 0) {
    throw new Error(`Shopify GraphQL error: ${json.errors[0].message}`);
  }

  return json.data;
}