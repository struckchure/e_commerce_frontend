/* eslint-disable @next/next/no-img-element */
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import AuthService from "../services/auth_service";
import CartService from "../services/cart_service";
import ProductService from "../services/product_service";

export default function Home() {
  const router = useRouter();
  const { skip, limit } = router.query;
  const [search, setSearch] = useState("");

  const {
    data: products,
    isLoading,
    error,
  } = useQuery(["products", search, skip, limit], () =>
    new ProductService().list_product({ search, skip, limit })
  );

  const { data: user } = useQuery(
    "user",
    () => new AuthService().getProfile(),
    {
      enabled: !!getCookie("token"),
    }
  );

  const cart_mutation = useMutation(
    ({ product_id, quantity }) => {
      return new CartService().add_cart_item(product_id, quantity);
    },
    {
      onSuccess: (data) => {
        toast.success(
          `${data?.data?.product.name} has been added to your cart`
        );
      },
      onError: () => {
        toast.error("An Error occured while adding product to cart");
      },
    }
  );

  return (
    <main className="bg-gray-900 p-4">
      <div className="w-full h-full">
        <div className="w-full flex justify-between items-center mx-auto container">
          <div className="w-fit">
            <form onSubmit={(e) => e.preventDefault()} className="p-2">
              <input
                type="text"
                value={search}
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          </div>

          <div className="flex items-center justify-center gap-4">
            {user ? (
              <div className="flex gap-2 items-center">
                <Link href="/cart">
                  <button>Cart</button>
                </Link>

                <Link href="/orders">
                  <button>Orders</button>
                </Link>
              </div>
            ) : (
              <>
                <button>
                  <Link href="/login">Login</Link>
                </button>

                <button>
                  <Link href="/register">Register</Link>
                </button>
              </>
            )}
          </div>
        </div>

        <div className="container mx-auto my-4">
          {isLoading ? (
            <p className="text-3xl font-mono w-fit tracking-widest text-white animate-pulse">
              Loading ...
            </p>
          ) : error ? (
            <p className="text-3xl font-mono w-fit tracking-widest text-white animate-pulse">
              Error
            </p>
          ) : (
            <div className="flex justify-start items-start gap-4">
              {products?.data?.map((product) => (
                <div
                  key={product.id}
                  className="bg-gray-800 p-4 rounded-md max-w-[250px] min-h-[300px] group hover:cursor-pointer"
                >
                  <div className="rounded-md overflow-hidden">
                    <img
                      src={product.images[0]}
                      className="w-full h-40 object-cover group-hover:scale-110 transition-all duration-300 transform"
                      alt={product.name}
                    />
                  </div>
                  <p className="text-white font-mono text-3xl mt-2">
                    {product.name}
                  </p>
                  <label className="text-white font-mono text-lg my-0">
                    &#8358; {product.price}
                  </label>
                  <label className="text-white block">
                    {product.stock} left
                  </label>

                  <div className="flex items-center justify-start gap-2 mt-2">
                    <button className="bg-gray-700 p-2 rounded-md">
                      <p className="text-white font-mono text-sm my-0">
                        Buy Now
                      </p>
                    </button>
                    <button
                      className="bg-gray-700 p-2 rounded-md"
                      onClick={() =>
                        cart_mutation.mutate({
                          product_id: product.id,
                          quantity: 1,
                        })
                      }
                    >
                      <p className="text-white font-mono text-sm my-0">
                        Add to Cart
                      </p>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
