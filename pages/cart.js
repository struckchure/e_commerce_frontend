/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { toast } from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import CartService from "../services/cart_service";

export default function CartPage() {
  const {
    data: cart_items,
    isLoading,
    isError,
  } = useQuery("cart", () => new CartService().list_cart_items());

  const { mutate: checkout_mutate, isLoading: cart_isLoading } = useMutation(
    () => {
      toast.success("Processing payment link ...");

      return new CartService().checkout_cart();
    },
    {
      onSuccess: (data) => {
        const { url } = data.data;

        toast.success("Redirecting to payment link ...");

        window.location.href = url;
      },
      onError: () => {},
    }
  );

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

      <div className="container mx-auto overflow-hidden bg-gray-800 rounded-lg">
        <table className="w-full">
          <thead className="w-full bg-gray-600 border-b-2">
            <tr>
              <th className="w-3">#</th>
              <th>Image</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {cart_items?.data?.map((cart_item, index) => (
              <tr key={index}>
                <td className="w-3">{index + 1}</td>
                <td>
                  <img
                    src={cart_item.product.images[0]}
                    alt={cart_item.product.name}
                    className="rounded-md w-auto h-auto object-cover"
                  />
                </td>
                <td>{cart_item.product.name}</td>
                <td>{cart_item.quantity}</td>
                <td>&#8358; {cart_item.price}</td>
                <td>{cart_item.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={checkout_mutate} disabled={cart_isLoading}>
        Checkout
      </button>
    </main>
  );
}
