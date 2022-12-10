/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";
import CartService from "../services/cart_service";

function Cart() {
  const {
    data: cart_items,
    isLoading,
    isError,
  } = useQuery("cart", () => new CartService().list_cart_items());

  if (isLoading) {
    return (
      <main className="bg-gray-900 p-4 grid place-items-center">
        <p className="text-white text-3xl">Loading ...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="bg-gray-900 p-4 grid place-items-center">
        <p className="text-white text-3xl">An Error Occured</p>
      </main>
    );
  }

  return (
    <main className="bg-gray-900 p-4 grid place-items-center">
      <Link href="/" className="fixed top-[5%] left-[10%]">
        <button className="bg-gray-800 text-white py-4 px-6 text-lg rounded-md">
          Back
        </button>
      </Link>

      <div className="container mx-auto p-4 flex flex-col gap-2">
        {cart_items?.data?.map((cart_item, index) => (
          <div
            key={index}
            className="bg-gray-800 p-4 rounded-lg flex items-center justify-evenly"
          >
            <img
              src={cart_item.product.images[0]}
              alt={cart_item.product.name}
              className="rounded-md w-auto h-auto object-cover"
            />

            <p className="text-white text-2xl">{cart_item.product.name}</p>

            <p className="text-white text-2xl">X{cart_item.quantity}</p>

            <p className="text-white text-2xl">{cart_item.price}</p>
          </div>
        ))}
      </div>

      <button>Checkout</button>
    </main>
  );
}

export default Cart;
