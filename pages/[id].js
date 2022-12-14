/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import BaseLayout from "../lib/layouts/base_layout";
import ProductService from "../lib/services/product_service";

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;
  const {
    data: product,
    isLoading,
    error,
  } = useQuery("product_details", () => new ProductService().get_product(id));

  if (isLoading) {
    return (
      <div>
        <p className="text-white text-3xl">Loading ...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p className="text-white text-3xl">An Error Occured</p>
      </div>
    );
  }

  return (
    <BaseLayout>
      <BaseLayout.Navbar />
      <div className="container mx-auto py-10">
        <div className="p-4 grid place-items-center h-full">
          <div className="md:flex gap-4 justify-between items-start w-full h-full">
            <div className="flex flex-col gap-2">
              <img
                src={product.data.images[0]}
                alt={product.data.name}
                className="rounded-md w-full h-[500px] object-cover"
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
                &#8358; {product.data.price}
              </label>

              <div className="md:flex items-center md:justify-start gap-2 mt-2 grid grid-cols-1">
                <button className="py-4 px-6">
                  <p className="text-white font-mono text-lg my-0">Buy Now</p>
                </button>
                <button className="py-4 px-6">
                  <p className="text-white font-mono text-lg my-0">
                    Add to Cart
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
