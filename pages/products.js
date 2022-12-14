import React, { useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import BaseLayout from "../lib/layouts/base_layout";
import ProductService from "../lib/services/product_service";

export default function ProductPage() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [productPrice, setProductPrice] = useState(0);
  const [productStock, setProductStock] = useState(0);
  const [productTags, setProductTags] = useState([]);
  const [productCategory, setProductCategory] = useState("");

  const productData = useMemo(() => {
    return {
      name: productName,
      description: productDescription,
      images: productImages,
      price: productPrice,
      stock: productStock,
      tags: productTags,
      category: productCategory,
    };
  }, [
    productCategory,
    productDescription,
    productImages,
    productName,
    productPrice,
    productStock,
    productTags,
  ]);

  const { mutate: productMutate } = useMutation(
    () => new ProductService().add_product(productData),
    {
      onSuccess: () => {
        toast.success("Product has been added");
      },
      onError: () => {
        toast.error("An Error Occured");
      },
    }
  );

  return (
    <BaseLayout>
      <BaseLayout.Navbar />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          productMutate();
        }}
        className="flex flex-col gap-2 mx-auto w-fit py-4"
      >
        <div className="flex flex-col justify-start">
          <label className="text-sm text-white">Product Name</label>
          <input
            type="text"
            onChange={(e) => {
              setProductName(e.target.value);
            }}
            value={productName}
          />
        </div>

        <div className="flex flex-col justify-start">
          <label className="text-sm text-white">Product Description</label>
          <textarea
            onChange={(e) => {
              setProductDescription(e.target.value);
            }}
            value={productDescription}
          />
        </div>

        <div className="flex flex-col justify-start">
          <label className="text-sm text-white">Product Images</label>
          <input
            type="file"
            onChange={(e) => {
              setProductImages(Array.from(e.target.files));
            }}
            multiple={true}
          />
        </div>

        <div className="flex flex-col justify-start">
          <label className="text-sm text-white">Product Price</label>
          <input
            type="number"
            onChange={(e) => {
              setProductPrice(e.target.value);
            }}
            value={productPrice}
          />
        </div>

        <div className="flex flex-col justify-start">
          <label className="text-sm text-white">Product Stock</label>
          <input
            type="number"
            onChange={(e) => {
              setProductStock(e.target.value);
            }}
            value={productStock}
          />
        </div>

        <div className="flex flex-col justify-start">
          <label className="text-sm text-white">Product Tags</label>
          <input
            type="text"
            onChange={(e) => {
              setProductTags(e.target.value.split(","));
            }}
            value={productTags}
          />
        </div>

        <div className="flex flex-col justify-start">
          <label className="text-sm text-white">Product Category</label>
          <input
            type="text"
            onChange={(e) => {
              setProductCategory(e.target.value);
            }}
            value={productCategory}
          />
        </div>

        <button>Save</button>
      </form>
    </BaseLayout>
  );
}
