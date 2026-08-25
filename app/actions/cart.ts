// 'use server';

// import { createCart, addToCart, getCart, updateCartLine, removeCartLine } from '@/services/cart';

// export async function addToCartAction(
//   cartId: string | null,
//   variantId: string,
//   quantity: number = 1
// ) {
//   const updatedCart = cartId
//     ? await addToCart(cartId, variantId, quantity)
//     : await createCart(variantId, quantity);

//   if (!updatedCart) {
//     throw new Error('Failed to update cart');
//   }

//   const fullCart = await getCart(updatedCart.id);
//   return fullCart;
// }

// export async function getCartAction(cartId: string) {
//   return getCart(cartId);
// }

// export async function updateCartLineAction(cartId: string, lineId: string, quantity: number) {
//   const updatedCart = await updateCartLine(cartId, lineId, quantity);

//   if (!updatedCart) {
//     throw new Error('Failed to update quantity');
//   }

//   return getCart(updatedCart.id);
// }

// export async function removeCartLineAction(cartId: string, lineId: string) {
//   const updatedCart = await removeCartLine(cartId, lineId);

//   if (!updatedCart) {
//     throw new Error('Failed to remove item');
//   }

//   return getCart(updatedCart.id);
// }