// "use client";

// import {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   useCallback,
//   ReactNode,
//   useRef,
// } from "react";
// import {
//   Cart,
//   createCart,
//   addToCart,
//   updateCartLine,
//   removeCartLine,
//   getCart
// } from "@/services/cart";
// // import {
// //   addToCartAction,
// //   getCartAction,
// //   updateCartLineAction,
// //   removeCartLineAction,
// // } from "@/app/actions/cart";

// const CART_ID_KEY = "meristore_cart_id";

// interface CartContextValue {
//   cart: Cart | null;
//   loading: boolean;
//   error: string | null;
//   updatingLines: Set<string>;
//   addItem: (variantId: string, quantity?: number) => Promise<void>;
//   updateQuantity: (lineId: string, quantity: number) => Promise<void>;
//   removeItem: (lineId: string) => Promise<void>;
// }

// const CartContext = createContext<CartContextValue | undefined>(undefined);

// export function CartProvider({ children }: { children: ReactNode }) {
//   const [cart, setCart] = useState<Cart | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [updatingLines, setUpdatingLines] = useState<Set<string>>(new Set());

//   useEffect(() => {
//     const existingCartId = localStorage.getItem(CART_ID_KEY);

//     if (!existingCartId) {
//       setLoading(false);
//       return;
//     }

//     getCart(existingCartId)
//       .then((fetchedCart) => {
//         if (fetchedCart) {
//           setCart(fetchedCart);
//         } else {
//           localStorage.removeItem(CART_ID_KEY);
//         }
//       })
//       .catch(() => {
//         localStorage.removeItem(CART_ID_KEY);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   // const addItem = useCallback(
//   //   async (variantId: string, quantity: number = 1) => {
//   //     setError(null);
//   //     try {
//   //       const existingCartId = localStorage.getItem(CART_ID_KEY);
//   //       const updatedCart = await addToCartAction(
//   //         existingCartId,
//   //         variantId,
//   //         quantity,
//   //       );

//   //       if (updatedCart) {
//   //         localStorage.setItem(CART_ID_KEY, updatedCart.id);
//   //         setCart(updatedCart);
//   //       }
//   //     } catch (err) {
//   //       setError(err instanceof Error ? err.message : "Something went wrong");
//   //     }
//   //   },
//   //   [],
//   // );

//   const addItem = useCallback(
//     async (variantId: string, quantity: number = 1) => {
//       setError(null);
//       try {
//         const existingCartId = localStorage.getItem(CART_ID_KEY);
//         const updatedCart = existingCartId
//           ? await addToCart(existingCartId, variantId, quantity)
//           : await createCart(variantId, quantity);

//         if (updatedCart) {
//           localStorage.setItem(CART_ID_KEY, updatedCart.id);
//           const fullCart = await getCart(updatedCart.id);
//           setCart(fullCart);
//         }
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Something went wrong");
//       }
//     },
//     [],
//   );

//   // const updateQuantity = useCallback(
//   //   async (lineId: string, quantity: number) => {
//   //     if (!cart) return;
//   //     setError(null);

//   //     setUpdatingLines((prev) => new Set(prev).add(lineId));

//   //     const previousCart = cart;
//   //     setCart({
//   //       ...cart,
//   //       lines: cart.lines.map((line) =>
//   //         line.id === lineId ? { ...line, quantity } : line,
//   //       ),
//   //     });

//   //     try {
//   //       const updatedCart = await updateCartLineAction(
//   //         cart.id,
//   //         lineId,
//   //         quantity,
//   //       );

//   //       if (updatedCart) {
//   //         const actualLine = updatedCart.lines.find((l) => l.id === lineId);
//   //         if (actualLine && actualLine.quantity < quantity) {
//   //           setError(`Only ${actualLine.quantity} in stock for this item.`);
//   //         }
//   //         setCart(updatedCart);
//   //       }
//   //     } catch (err) {
//   //       setCart(previousCart);
//   //       setError(
//   //         err instanceof Error ? err.message : "Failed to update quantity",
//   //       );
//   //     } finally {
//   //       setUpdatingLines((prev) => {
//   //         const next = new Set(prev);
//   //         next.delete(lineId);
//   //         return next;
//   //       });
//   //     }
//   //   },
//   //   [cart],
//   // );

//   // const updateQuantity = useCallback(
//   //   async (lineId: string, quantity: number) => {
//   //     if (!cart) return;
//   //     setError(null);

//   //     setUpdatingLines((prev) => new Set(prev).add(lineId));

//   //     const previousCart = cart;
//   //     setCart({
//   //       ...cart,
//   //       lines: cart.lines.map((line) =>
//   //         line.id === lineId ? { ...line, quantity } : line,
//   //       ),
//   //     });

//   //     try {
//   //       const updatedCart = await updateCartLine(cart.id, lineId, quantity);

//   //       if (updatedCart) {
//   //         const fullCart = await getCart(updatedCart.id);
//   //         const actualLine = fullCart?.lines.find((l) => l.id === lineId);

//   //         if (actualLine && actualLine.quantity === 0) {
//   //           await removeCartLine(cart.id, lineId);
//   //           const refreshedCart = await getCart(cart.id);
//   //           setCart(refreshedCart);
//   //           setError(
//   //             "This item is currently out of stock and was removed from your cart.",
//   //           );
//   //         } else if (actualLine && actualLine.quantity < quantity) {
//   //           setError(`Only ${actualLine.quantity} in stock for this item.`);
//   //           setCart(fullCart);
//   //         } else {
//   //           setCart(fullCart);
//   //         }
//   //       }
//   //     } catch (err) {
//   //       setCart(previousCart);
//   //       setError(
//   //         err instanceof Error ? err.message : "Failed to update quantity",
//   //       );
//   //     } finally {
//   //       setUpdatingLines((prev) => {
//   //         const next = new Set(prev);
//   //         next.delete(lineId);
//   //         return next;
//   //       });
//   //     }
//   //   },
//   //   [cart],
//   // );

//   // const removeItem = useCallback(
//   //   async (lineId: string) => {
//   //     if (!cart) return;
//   //     setError(null);

//   //     setUpdatingLines((prev) => new Set(prev).add(lineId));

//   //     try {
//   //       const updatedCart = await removeCartLineAction(cart.id, lineId);
//   //       setCart(updatedCart);
//   //     } catch (err) {
//   //       setError(err instanceof Error ? err.message : "Failed to remove item");
//   //     } finally {
//   //       setUpdatingLines((prev) => {
//   //         const next = new Set(prev);
//   //         next.delete(lineId);
//   //         return next;
//   //       });
//   //     }
//   //   },
//   //   [cart],
//   // );

//   const pendingRequestRef = useRef<Record<string, number>>({});

//   const updateQuantity = useCallback(
//     async (lineId: string, quantity: number) => {
//       if (!cart) return;
//       setError(null);

//       // Always update the UI instantly, every click
//       setCart((prev) =>
//         prev
//           ? {
//               ...prev,
//               lines: prev.lines.map((line) =>
//                 line.id === lineId ? { ...line, quantity } : line,
//               ),
//             }
//           : prev,
//       );

//       // Track the LATEST requested quantity for this line
//       pendingRequestRef.current[lineId] = quantity;

//       try {
//         const updatedCart = await updateCartLine(cart.id, lineId, quantity);

//         // If a newer click happened while this request was in flight, ignore this stale response
//         if (pendingRequestRef.current[lineId] !== quantity) {
//           return;
//         }

//         if (updatedCart) {
//           const fullCart = await getCart(updatedCart.id);
//           const actualLine = fullCart?.lines.find((l) => l.id === lineId);

//           if (actualLine && actualLine.quantity === 0) {
//             await removeCartLine(cart.id, lineId);
//             const refreshedCart = await getCart(cart.id);
//             setCart(refreshedCart);
//             setError(
//               "This item is currently out of stock and was removed from your cart.",
//             );
//           } else if (actualLine && actualLine.quantity < quantity) {
//             setError(`Only ${actualLine.quantity} in stock for this item.`);
//             setCart(fullCart);
//           } else {
//             setCart(fullCart);
//           }
//         }
//       } catch (err) {
//         setError(
//           err instanceof Error ? err.message : "Failed to update quantity",
//         );
//       }
//     },
//     [cart],
//   );

//   const removeItem = useCallback(
//     async (lineId: string) => {
//       if (!cart) return;
//       setError(null);

//       setUpdatingLines((prev) => new Set(prev).add(lineId));

//       try {
//         const updatedCart = await removeCartLine(cart.id, lineId);

//         if (updatedCart) {
//           const fullCart = await getCart(updatedCart.id);
//           setCart(fullCart);
//         }
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Failed to remove item");
//       } finally {
//         setUpdatingLines((prev) => {
//           const next = new Set(prev);
//           next.delete(lineId);
//           return next;
//         });
//       }
//     },
//     [cart],
//   );
//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         loading,
//         error,
//         updatingLines,
//         addItem,
//         updateQuantity,
//         removeItem,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export function useCart() {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// }

"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { createCart, getCart } from "@/services/cart";
import { LocalCartLine } from "@/types/localcart";

const LOCAL_CART_KEY = "meristore_local_cart";

interface CartContextValue {
  lines: LocalCartLine[];
  totalQuantity: number;
  totalAmount: number;
  currencyCode: string;
  loading: boolean;
  error: string | null;
  checkingOut: boolean;
  addItem: (line: LocalCartLine) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  checkout: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<LocalCartLine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkingOut, setCheckingOut] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_CART_KEY);
    if (saved) {
      try {
        setLines(JSON.parse(saved));
      } catch {
        localStorage.removeItem(LOCAL_CART_KEY);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(lines));
    }
  }, [lines, loading]);

  const addItem = useCallback((newLine: LocalCartLine) => {
    setError(null);
    setLines((prev) => {
      const existing = prev.find((l) => l.variantId === newLine.variantId);
      if (existing) {
        return prev.map((l) =>
          l.variantId === newLine.variantId
            ? { ...l, quantity: l.quantity + newLine.quantity }
            : l,
        );
      }
      return [...prev, newLine];
    });
  }, []);

  const updateQuantity = useCallback((variantId: string, quantity: number) => {
    setError(null);
    setLines((prev) =>
      prev.map((l) => (l.variantId === variantId ? { ...l, quantity } : l)),
    );
  }, []);

  const removeItem = useCallback((variantId: string) => {
    setError(null);
    setLines((prev) => prev.filter((l) => l.variantId !== variantId));
  }, []);

  const checkout = useCallback(async () => {
    if (lines.length === 0) return;
    setCheckingOut(true);
    setError(null);

    try {
      const cartLines = lines.map((l) => ({
        merchandiseId: l.variantId,
        quantity: l.quantity,
      }));

      const cart = await createCart(cartLines);

      if (!cart?.checkoutUrl) {
        throw new Error("Failed to create checkout.");
      }

      const fullCart = await getCart(cart.id);
      const shortages = fullCart?.lines.filter((serverLine) => {
        const localLine = lines.find(
          (l) => l.variantId === serverLine.merchandise.id,
        );
        return localLine && serverLine.quantity < localLine.quantity;
      });

      if (shortages && shortages.length > 0) {
        setError(
          "Some items had less stock than requested and were adjusted. Please review your cart before continuing.",
        );
        setLines(
          fullCart!.lines.map((l) => ({
            variantId: l.merchandise.id,
            quantity: l.quantity,
            variantTitle: l.merchandise.title,
            price: l.merchandise.price,
            productTitle: l.merchandise.product.title,
            productHandle: l.merchandise.product.handle,
            image: l.merchandise.product.featuredImage,
          })),
        );
        setCheckingOut(false);
        return;
      }
      setCheckingOut(false);
      window.location.href = cart.checkoutUrl;
    } catch (err) {
      setCheckingOut(false);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong preparing checkout.",
      );
    }
  }, [lines]);

  const totalQuantity = lines.reduce((sum, l) => sum + l.quantity, 0);
  const totalAmount = lines.reduce(
    (sum, l) => sum + parseFloat(l.price.amount) * l.quantity,
    0,
  );
  const currencyCode = lines[0]?.price.currencyCode ?? "NGN";

  return (
    <CartContext.Provider
      value={{
        lines,
        totalQuantity,
        totalAmount,
        currencyCode,
        loading,
        error,
        checkingOut,
        addItem,
        updateQuantity,
        removeItem,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}