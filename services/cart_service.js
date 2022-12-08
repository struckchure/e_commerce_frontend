import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

axios.defaults.baseURL = API_URL;

export default class CartService {
  view_cart(params) {
    try {
      Object.keys(params).forEach(
        (key) => params[key] == null || (!params[key] && delete params[key])
      );

      return axios.get("/cart", { params }).then((res) => res.data);
    } catch (error) {}
  }

  checkout_cart(id) {
    try {
      return axios
        .post(`/cart/checkout/${id}`)
        .then((res) => res.data);
    } catch (error) {
      throw error;
    }
  }
}
