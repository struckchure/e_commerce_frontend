/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
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

  return (
    <main className="bg-gray-900 p-4">
      <div className="w-full h-full">
        <div className="w-full flex flex-col justify-start items-center mx-auto container">
          <h1 className="text-lg text-white font-mono">Products</h1>
          <form onSubmit={(e) => e.preventDefault()} className="p-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="p-2 border-2 border-gray-300 rounded-md"
            />
          </form>
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
                <Link href={`/${product.id}`} key={product.id}>
                  <div className="bg-gray-800 p-4 rounded-md max-w-[250px] min-h-[300px] group hover:cursor-pointer">
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
                      $ {product.price}
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
                      <button className="bg-gray-700 p-2 rounded-md">
                        <p className="text-white font-mono text-sm my-0">
                          Add to Cart
                        </p>
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
