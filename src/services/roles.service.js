import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_BACKEND_URl + "/roles/";

const getAll = () => {
  return axios.get(API_URL, { headers: authHeader() });
};


export default {
  getAll,
  
};
