/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";
import OrderService from "../services/order_service";

export default function OrderPage() {
  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery("orders", () => new OrderService().list_order());

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
              <th>Reference</th>
              <th>Payment Status</th>
              <th>Order Status</th>
              <th>Date</th>
              <th className="w-10">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders?.data?.map((order, index) => (
              <tr key={index}>
                <td className="w-3">{index + 1}</td>
                <td>{order.reference}</td>
                <td>{order.payment_status}</td>
                <td>{order.status}</td>
                <td>{order.created_at}</td>
                <td>
                  <button>Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
