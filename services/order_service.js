import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

axios.defaults.baseUrl = API_URL;

export default class OrderService {
  list_order(params) {
    try {
      Object.keys(params).forEach(
        (key) => params[key] == null || (!params[key] && delete params[key])
      );

      return axios.get("/orders", { params }).then((res) => res.data);
    } catch (error) {
      throw error;
    }
  }

  get_order(id) {
    try {
      return axios.get(`/orders/${id}`).then((res) => res.data);
    } catch (error) {
      throw error;
    }
  }
}
