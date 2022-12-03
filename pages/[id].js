/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import ProductService from "../services/product_service";

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;
  const {
    data: product,
    isLoading,
    error,
  } = useQuery("product_details", () => new ProductService().get_product(id));

  return (
    <main className="bg-gray-900 p-4 grid place-items-center">
      {isLoading ? (
        <div>
          <p className="animate-pulse">Loading ...</p>
        </div>
      ) : (
        <div className="container mx-auto">
          <Link href="/" className="fixed top-[5%] left-[10%]">
            <button className="bg-gray-800 text-white py-4 px-6 text-lg rounded-md">
              Back
            </button>
          </Link>
          <div className="flex gap-4 justify-between items-start w-full">
            <div className="flex flex-col gap-2">
              <img
                src={product.data.images[0]}
                alt={product.data.name}
                className="rounded-md w-full h-[300px] object-cover"
              />

              <div className="flex gap-2 min-w-full overflow-x-auto h-fit">
                {product.data.images.map((image, index) => (
                  <img
                    src={image}
                    alt={`${product.data.name} image ${index}`}
                    className="rounded-md w-40 h-auto object-cover"
                    key={index}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-start items-start gap-2 w-1/2">
              <p className="text-white text-[5em] font-bold">
                {product.data.name}
              </p>
              <p className="text-white text-lg">{product.data.description}</p>
              <p className="text-sm text-gray-300">{product.data.stock} left</p>
              <label className="block text-white text-[3em]">
                $ {product.data.price}
              </label>

              <div className="flex items-center justify-start gap-2 mt-2">
                <button className="bg-gray-700 p-4 rounded-md">
                  <p className="text-white font-mono text-lg my-0">Buy Now</p>
                </button>
                <button className="bg-gray-700 p-4 rounded-md">
                  <p className="text-white font-mono text-lg my-0">
                    Add to Cart
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
