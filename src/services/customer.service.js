import axios from "axios";

import authHeader from "./auth-header";





const API_URL = process.env.REACT_APP_BACKEND_URl + "/customer/";

const getAll = () => {
  return axios.get(API_URL);
};

const register = (data) => {
  return axios.post(API_URL + "register", data);
};

const edit = (data) => {
  return axios.post(API_URL + "edit", data);
};




export default {
  getAll,
  register,
  
  edit,
  
};
