/* eslint-disable @next/next/no-img-element */
import moment from "moment";
import React from "react";
import { useQuery } from "react-query";
import BaseLayout from "../lib/layouts/base_layout";
import OrderService from "../lib/services/order_service";

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
    <BaseLayout>
      <BaseLayout.Navbar />
      <div className="p-4 grid place-items-center">
        <div className="container mx-auto overflow-hidden bg-gray-800 rounded-lg">
          <table className="w-full">
            <thead className="w-full bg-gray-600 border-b-2">
              <tr>
                <th className="w-3">#</th>
                <th>Image</th>
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
                  <td>
                    <img
                      src={order.product.images[0]}
                      alt={order.product.name}
                      className="rounded-md w-[50px] h-[50px] object-cover"
                    />
                  </td>
                  <td>{order.reference}</td>
                  <td>{order.payment_status}</td>
                  <td>{order.status}</td>
                  <td>{moment(order.created_at).format("lll")}</td>
                  <td>
                    <button>Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </BaseLayout>
  );
}
