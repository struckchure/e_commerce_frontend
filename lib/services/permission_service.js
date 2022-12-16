import axios from "axios";
import { getCookie } from "cookies-next";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

axios.defaults.baseURL = API_URL;

export default class PermissionService {
  list_permissions(params) {
    try {
      params = Object.keys(params).length ? params : {};

      Object.keys(params).forEach(
        (key) => params[key] == null || (!params[key] && delete params[key])
      );
      const headers = {
        Authorization: `Token ${getCookie("token")}`,
      };

      return axios({
        method: "get",
        url: "/permission/",
        params,
        headers,
      }).then((res) => res.data);
    } catch (error) {
      throw error;
    }
  }

  update_permission(updateAction, userID, codename) {
    try {
      const params = {
        update_action: updateAction,
        user_id: userID,
        codename: codename,
      };
      const headers = {
        Authorization: `Token ${getCookie("token")}`,
      };

      return axios({
        method: "put",
        url: "/permission/",
        params,
        headers,
      }).then((res) => res.data);
    } catch (error) {
      throw error;
    }
  }
}
