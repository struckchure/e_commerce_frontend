import axios from "axios";
import { getCookie } from "cookies-next";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

axios.defaults.baseURL = API_URL;

export default class AuthService {
  login(userCredentials) {
    try {
      return axios({
        method: "post",
        url: "/auth/login/",
        data: userCredentials,
      }).then((res) => res.data);
    } catch (error) {
      throw error;
    }
  }

  register(userData) {
    try {
      return axios({
        method: "post",
        url: "/auth/register/",
        data: userData,
      }).then((res) => res.data);
    } catch (error) {
      throw error;
    }
  }

  getProfile() {
    try {
      return axios({
        method: "get",
        url: "/auth/profile/",
        headers: {
          Authorization: `Token ${getCookie("token")}`,
        },
      }).then((res) => res.data);
    } catch (error) {
      throw error;
    }
  }
}
