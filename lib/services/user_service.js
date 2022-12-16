import axios from "axios";
import { getCookie } from "cookies-next";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

axios.defaults.baseURL = API_URL;

export default class UserService {
  list_users(params) {
    try {
      params = params?.length ? params : {};

      Object.keys(params).forEach(
        (key) => params[key] == null || (!params[key] && delete params[key])
      );
      const headers = {
        Authorization: `Token ${getCookie("token")}`,
      };

      return axios.get("/users/", { params, headers }).then((res) => res.data);
    } catch (error) {
      throw error;
    }
  }

  get_user(user_id) {
    try {
      const headers = {
        Authorization: `Token ${getCookie("token")}`,
      };

      return axios
        .get(`/users/${user_id}`, { headers })
        .then((res) => res.data);
    } catch (error) {
      throw error;
    }
  }

  update_user(userID, userData) {
    try {
      const headers = {
        Authorization: `Token ${getCookie("token")}`,
      };

      return axios({
        url: `/users/${userID}/`,
        method: "put",
        data: userData,
        headers,
      }).then((res) => res.data);
    } catch (error) {
      throw error;
    }
  }
}
