import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_BACKEND_URl;

const getAll = () => {
  let url =  API_URL + "/user/"
  return axios.get(url, { headers: authHeader() });
};

const RoleUser = (role_id) => {
  let url =  API_URL + "/user/user-role?role_id=" + role_id
  return axios.get(url, { headers: authHeader() });
};


export default {
  RoleUser,
  getAll,
  
  
};
