import axios from "axios";
import { getCookie } from "cookies-next";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

axios.defaults.baseURL = API_URL;

export default class CartService {
  list_cart_items(params) {
    try {
      params = params?.length ? params : {};

      Object.keys(params).forEach(
        (key) => params[key] == null || (!params[key] && delete params[key])
      );
      const headers = {
        Authorization: `Token ${getCookie("token")}`,
      };

      return axios.get("/cart/", { params, headers }).then((res) => res.data);
    } catch (error) {
      throw error;
    }
  }

  add_cart_item(product_id, quantity) {
    try {
      const headers = {
        Authorization: `Token ${getCookie("token")}`,
      };
      const data = {
        product: product_id,
        quantity,
      };

      return axios.post("/cart/", data, { headers }).then((res) => res.data);
    } catch (error) {
      throw error;
    }
  }

  checkout_cart() {
    try {
      const headers = {
        Authorization: `Token ${getCookie("token")}`,
      };

      return axios({
        method: "post",
        url: "/cart/checkout/",
        headers,
      }).then((res) => res.data);
    } catch (error) {
      throw error;
    }
  }
}
