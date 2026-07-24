"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { Cart } from "@/services/cart";
import {
  addToCartAction,
  getCartAction,
  updateCartLineAction,
  removeCartLineAction,
} from "@/app/actions/cart";

const CART_ID_KEY = "meristore_cart_id";

interface CartContextValue {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const existingCartId = localStorage.getItem(CART_ID_KEY);

    if (!existingCartId) {
      setLoading(false);
      return;
    }

    getCartAction(existingCartId)
      .then((fetchedCart) => {
        if (fetchedCart) {
          setCart(fetchedCart);
        } else {
          localStorage.removeItem(CART_ID_KEY);
        }
      })
      .catch(() => {
        localStorage.removeItem(CART_ID_KEY);
      })
      .finally(() => setLoading(false));
  }, []);

  const addItem = useCallback(
    async (variantId: string, quantity: number = 1) => {
      setError(null);
      try {
        const existingCartId = localStorage.getItem(CART_ID_KEY);
        const updatedCart = await addToCartAction(
          existingCartId,
          variantId,
          quantity,
        );

        if (updatedCart) {
          localStorage.setItem(CART_ID_KEY, updatedCart.id);
          setCart(updatedCart);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      }
    },
    [],
  );

  const updateQuantity = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart) return;
      setError(null);
      try {
        const updatedCart = await updateCartLineAction(
          cart.id,
          lineId,
          quantity,
        );
        setCart(updatedCart);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to update quantity",
        );
      }
    },
    [cart],
  );

  const removeItem = useCallback(
    async (lineId: string) => {
      if (!cart) return;
      setError(null);
      try {
        const updatedCart = await removeCartLineAction(cart.id, lineId);
        setCart(updatedCart);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to remove item");
      }
    },
    [cart],
  );

  return (
    <CartContext.Provider
      value={{ cart, loading, error, addItem, updateQuantity, removeItem }}
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
