import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_BACKEND_URl + "/permission/roles_permission";

const getAll = (roleId) => {
  var role_id = roleId
  return axios.get(API_URL + '?role_id=' + role_id, { headers: authHeader() });
};


const register = (name, title, url) => {
  return axios.post(API_URL + "register", {
    name,
    title,
    url,
  });
};


const updatePermission = (role_id, permission_id,status) => {
  return axios.post(API_URL + "/update-permission", {
    role_id,
    permission_id,
    status,
  });
};


export default {
  getAll,
  register,
  updatePermission,
  
};
