const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

const endpoint = `https://${domain}/api/2025-01/graphql.json`;

interface ShopifyFetchParams {
    query: string;
    variables?: Record<string, unknown>;
}

interface ShopifyGraphQLResponse<T> {
    data: T;
    errors?: { message: string }[];
}

export async function shopifyFetch<T>({
    query,
    variables,
}: ShopifyFetchParams): Promise<T> {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
        'CONTENT-TYPE': 'application/json',
        'Shopify-Storefront-Private-Token': token as string,
    },
    body: JSON.stringify({ query, variables}),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Shopify API error (${res.status}): ${text}`);
  }

  const json: ShopifyGraphQLResponse<T> = await res.json();

  if (json.errors && json.errors.length > 0) {
    throw new Error(`Shopoify GraphQL error: ${json.errors[0].message}`);
  }

  return json.data
}