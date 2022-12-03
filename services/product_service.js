import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

axios.defaults.baseURL = API_URL;

export default class ProductService {
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
