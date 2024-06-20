import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_BACKEND_URl + "/code/?parent_id=0";

const getAll = (id) => {
  var url = process.env.REACT_APP_BACKEND_URl + "/code/?parent_id=" + id;
  return axios.get(url, { headers: authHeader() });
};


export default {
  getAll,
  
};
