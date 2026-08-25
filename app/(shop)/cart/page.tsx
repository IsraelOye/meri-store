// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useCart } from "@/context/CartContext";
// import { Button } from "@/components/ui/button";
// import BackButton from "@/components/ui/product/BackButton";

// export default function CartPage() {
//   const { cart, loading, error, updateQuantity, removeItem, updatingLines } =
//     useCart();

//   if (loading) {
//     return (
//       <main className="max-w-3xl mx-auto px-4 py-16 text-center text-gray-500">
//         Loading cart...
//       </main>
//     );
//   }

//   if (!cart || cart.lines.length === 0) {
//     return (
//       <main className="max-w-3xl mx-auto px-4 py-24 flex flex-col items-center">
//         <Image
//           src="/empty-cart.png"
//           alt="Empty cart"
//           width={350}
//           height={350}
//           className="object-contain"
//         />
//         <p className="text-gray-700 text-lg">Your cart is empty.</p>
//         <Link href="/" className="mt-4 inline-block text-sm underline">
//           Continue shopping
//         </Link>
//       </main>
//     );
//   }

//   return (
//     <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 pb-10">
//       <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Cart</h1>

//       {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

//       <div className="divide-y divide-gray-200">
//         {cart.lines.map((line) => {
//           const isUpdating = updatingLines.has(line.id);

//           return (
//             <div key={line.id} className="py-4 flex gap-4">
//               <div className="w-20 h-20 relative bg-[#F3EEE5] rounded-md overflow-hidden shrink-0">
//                 {line.merchandise.product.featuredImage ? (
//                   <Image
//                     src={line.merchandise.product.featuredImage.url}
//                     alt={
//                       line.merchandise.product.featuredImage.altText ??
//                       line.merchandise.product.title
//                     }
//                     fill
//                     sizes="80px"
//                     className="object-cover"
//                   />
//                 ) : null}
//               </div>

//               <div className="flex-1">
//                 <p className="text-sm font-medium text-gray-900">
//                   {line.merchandise.product.title}
//                 </p>
//                 {line.merchandise.title !== "Default Title" && (
//                   <p className="text-sm text-gray-500">
//                     {line.merchandise.title}
//                   </p>
//                 )}
//                 <p className="mt-1 text-sm text-gray-600">
//                   {new Intl.NumberFormat("en-US", {
//                     style: "currency",
//                     currency: line.merchandise.price.currencyCode,
//                   }).format(parseFloat(line.merchandise.price.amount))}
//                 </p>

//                 <div className="mt-2 flex items-center gap-3">
//                   <div className="flex items-center border rounded-md">
//                     <button
//                       className="px-2 py-1 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
//                       disabled={isUpdating}
//                       onClick={() =>
//                         updateQuantity(line.id, Math.max(1, line.quantity - 1))
//                       }
//                       aria-label={`Decrease quantity of ${line.merchandise.product.title}`}
//                     >
//                       −
//                     </button>
//                     <span className="px-3 text-sm" aria-live="polite">
//                       {line.quantity}
//                     </span>
//                     <button
//                       className="px-2 py-1 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
//                       disabled={isUpdating}
//                       onClick={() => updateQuantity(line.id, line.quantity + 1)}
//                       aria-label={`Increase quantity of ${line.merchandise.product.title}`}
//                     >
//                       +
//                     </button>
//                   </div>

//                   <button
//                     className="text-sm text-red-600 hover:underline disabled:opacity-40 disabled:cursor-not-allowed"
//                     disabled={isUpdating}
//                     onClick={() => removeItem(line.id)}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <div className="mt-8 flex items-center justify-between border-t pt-6">
//         <span className="text-lg font-medium">Total</span>
//         <span className="text-lg font-bold">
//           {new Intl.NumberFormat("en-US", {
//             style: "currency",
//             currency: cart.cost.totalAmount.currencyCode,
//           }).format(parseFloat(cart.cost.totalAmount.amount))}
//         </span>
//       </div>

//       <Button asChild size="lg" className="mt-6 w-full">
//         <a href={cart.checkoutUrl}>Proceed to Checkout</a>
//       </Button>
//       <div className="flex justify-center mt-3">
//         <BackButton text="Back to Product" />
//       </div>
//     </main>
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const {
    lines,
    totalAmount,
    currencyCode,
    loading,
    error,
    checkingOut,
    updateQuantity,
    removeItem,
    checkout,
  } = useCart();

  if (loading) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-16 text-center text-gray-500">
        Loading cart...
      </main>
    );
  }

  if (lines.length === 0) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-24 flex flex-col items-center">
        <Image
          src="/empty-cart.png"
          alt="Empty cart"
          width={220}
          height={220}
          className="object-contain"
        />
        <p className="text-gray-700 text-lg">Your cart is empty.</p>
        <Link href="/" className="mt-4 inline-block text-sm underline">
          Continue shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Cart</h1>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      <div className="divide-y divide-gray-200">
        {lines.map((line) => (
          <div key={line.variantId} className="py-4 flex gap-4">
            <div className="w-20 h-20 relative bg-[#F3EEE5] rounded-md overflow-hidden shrink-0">
              {line.image ? (
                <Image
                  src={line.image.url}
                  alt={line.image.altText ?? line.productTitle}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              ) : null}
            </div>

            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {line.productTitle}
              </p>
              {line.variantTitle !== "Default Title" && (
                <p className="text-sm text-gray-500">{line.variantTitle}</p>
              )}
              <p className="mt-1 text-sm text-gray-600">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: line.price.currencyCode,
                }).format(parseFloat(line.price.amount))}
              </p>

              <div className="mt-2 flex items-center gap-3">
                <div className="flex items-center border rounded-md">
                  <button
                    className="px-2 py-1 text-sm"
                    onClick={() =>
                      updateQuantity(
                        line.variantId,
                        Math.max(1, line.quantity - 1),
                      )
                    }
                    aria-label={`Decrease quantity of ${line.productTitle}`}
                  >
                    −
                  </button>
                  <span className="px-3 text-sm" aria-live="polite">
                    {line.quantity}
                  </span>
                  <button
                    className="px-2 py-1 text-sm"
                    onClick={() =>
                      updateQuantity(line.variantId, line.quantity + 1)
                    }
                    aria-label={`Increase quantity of ${line.productTitle}`}
                  >
                    +
                  </button>
                </div>

                <button
                  className="text-sm text-red-600 hover:underline"
                  onClick={() => removeItem(line.variantId)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between border-t pt-6">
        <span className="text-lg font-medium">Total</span>
        <span className="text-lg font-bold">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currencyCode,
          }).format(totalAmount)}
        </span>
      </div>

      <Button
        size="lg"
        className="mt-6 w-full"
        disabled={checkingOut}
        onClick={checkout}
      >
        {checkingOut ? "Preparing checkout..." : "Proceed to Checkout"}
      </Button>
    </main>
  );
}