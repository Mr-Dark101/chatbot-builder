import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_BACKEND_URl + "/permission/";

const getAll = () => {
  return axios.get(API_URL, { headers: authHeader() });
};


const register = (name, title, url) => {
  return axios.post(API_URL + "register", {
    name,
    title,
    url,
  });
};


export default {
  getAll,
  register,
  
};
