import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

axios.defaults.baseURL = API_URL;

export default class UserService {
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
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }).then((res) => res.data);
    } catch (error) {
      throw error;
    }
  }
}
