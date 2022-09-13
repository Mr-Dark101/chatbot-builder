import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_BACKEND_URl + "/cptcode/?parent_id=0";

const getAll = (id) => {
  var url = process.env.REACT_APP_BACKEND_URl + "/cptcode/?parent_id=" + id;
  return axios.get(url, { headers: authHeader() });
};


const importdata = (data) => {
  var url = process.env.REACT_APP_BACKEND_URl + "/cptcode/importdata";
  return axios.post(url, data);
};

export default {
  getAll,
  importdata,
  
};
