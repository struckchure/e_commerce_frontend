import axios from "axios";
import { getCookie } from "cookies-next";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

axios.defaults.baseURL = API_URL;

export default class OrderService {
  list_order(params) {
    try {
      params = params?.length ? params : {};

      Object.keys(params).forEach(
        (key) => params[key] == null || (!params[key] && delete params[key])
      );
      const headers = {
        Authorization: `Token ${getCookie("token")}`,
      };

      return axios.get("/orders", { params, headers }).then((res) => res.data);
    } catch (error) {
      throw error;
    }
  }

  get_order(id) {
    try {
      const headers = {
        Authorization: `Token ${getCookie("token")}`,
      };

      return axios.get(`/orders/${id}`, { headers }).then((res) => res.data);
    } catch (error) {
      throw error;
    }
  }
}
