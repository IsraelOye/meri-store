import { shopifyFetch } from '@/lib/shopify/client';
import { CART_CREATE_MUTATION, CART_LINES_ADD_MUTATION, CART_QUERY, CART_LINES_UPDATE_MUTATION, CART_LINES_REMOVE_MUTATION } from '@/lib/shopify/queries';

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
    product: {
      title: string;
      handle: string;
      featuredImage: {
        url: string;
        altText: string | null;
      } | null;
    };
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  lines: CartLine[];
}

interface CartMutationResponse {
  cart: {
    id: string;
    checkoutUrl: string;
    totalQuantity: number;
  } | null;
  userErrors: { field: string[]; message: string }[];
}

export async function createCart(variantId: string, quantity: number = 1) {
  const data = await shopifyFetch<{ cartCreate: CartMutationResponse }>({
    query: CART_CREATE_MUTATION,
    variables: {
      lines: [{ merchandiseId: variantId, quantity }],
    },
  });

  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(data.cartCreate.userErrors[0].message);
  }

  return data.cartCreate.cart;
}

export async function addToCart(cartId: string, variantId: string, quantity: number = 1) {
  const data = await shopifyFetch<{ cartLinesAdd: CartMutationResponse }>({
    query: CART_LINES_ADD_MUTATION,
    variables: {
      cartId,
      lines: [{ merchandiseId: variantId, quantity }],
    },
  });

  if (data.cartLinesAdd.userErrors.length > 0) {
    throw new Error(data.cartLinesAdd.userErrors[0].message);
  }

  return data.cartLinesAdd.cart;
}

interface CartQueryResponse {
  cart: {
    id: string;
    checkoutUrl: string;
    totalQuantity: number;
    cost: { totalAmount: { amount: string; currencyCode: string } };
    lines: { edges: { node: CartLine }[] };
  } | null;
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const data = await shopifyFetch<CartQueryResponse>({
    query: CART_QUERY,
    variables: { cartId },
  });

  if (!data.cart) {
    return null;
  }

  return {
    ...data.cart,
    lines: data.cart.lines.edges.map((edge) => edge.node),
  };
}

export async function updateCartLine(cartId: string, lineId: string, quantity: number) {
  const data = await shopifyFetch<{ cartLinesUpdate: CartMutationResponse }>({
    query: CART_LINES_UPDATE_MUTATION,
    variables: {
      cartId,
      lines: [{ id: lineId, quantity }],
    },
  });

  if (data.cartLinesUpdate.userErrors.length > 0) {
    throw new Error(data.cartLinesUpdate.userErrors[0].message);
  }

  return data.cartLinesUpdate.cart;
}

export async function removeCartLine(cartId: string, lineId: string) {
  const data = await shopifyFetch<{ cartLinesRemove: CartMutationResponse }>({
    query: CART_LINES_REMOVE_MUTATION,
    variables: {
      cartId,
      lineIds: [lineId],
    },
  });

  if (data.cartLinesRemove.userErrors.length > 0) {
    throw new Error(data.cartLinesRemove.userErrors[0].message);
  }

  return data.cartLinesRemove.cart;
}