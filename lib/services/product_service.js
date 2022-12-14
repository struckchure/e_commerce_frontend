import axios from "axios";
import { getCookie } from "cookies-next";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

axios.defaults.baseURL = API_URL;

export default class ProductService {
  add_product(data) {
    const formData = new FormData();

    formData.append("name", data?.name);
    formData.append("description", data?.description);
    formData.append("price", data?.price);
    formData.append("stock", data?.stock);
    formData.append("category", data?.category);

    data?.tags?.forEach((tag) => {
      formData.append("tags", tag);
    });

    data?.images?.forEach((image) => {
      formData.append("images", image);
    });

    console.log(formData);

    try {
      return axios({
        url: "/products/",
        method: "post",
        data: formData,
        headers: {
          Authorization: `Token ${getCookie("token")}`,
        },
      }).then((res) => res.data);
    } catch (error) {
      throw error;
    }
  }

  list_product(params) {
    try {
      // remove null values from `params`
      Object.keys(params).forEach(
        (key) => params[key] == null || (!params[key] && delete params[key])
      );

      return axios.get("/products", { params }).then((res) => res.data);
    } catch (error) {
      throw error;
    }
  }

  get_product(id) {
    try {
      return axios.get(`/products/${id}`).then((res) => res.data);
    } catch (error) {
      throw error;
    }
  }
}
