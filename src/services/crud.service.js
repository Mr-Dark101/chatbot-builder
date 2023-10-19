import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_BACKEND_URl;

const getAll = (listUrl,master,params=false) => {

  let url =  API_URL + "/" + listUrl

   if(params !== false){
     url = url + '?page=' + params.page + '&size=' + params.size;
  }
  
  if(master === true){
   
    let url =  API_URL + "/master/list?type=" + listUrl

     if(params !== false){
       url = url + '&page=' + params.page + '&size=' + params.size;
    }
    return axios.get(url, { headers: authHeader() });
  }

  return axios.get(url, { headers: authHeader() });
};


const exportData = () => {

  let url =  API_URL + "/master/export-data"

  

  return axios.get(url, { headers: authHeader() });
};




const getById = (listUrl,master) => {

  let url =  API_URL + "/" + listUrl

   
  
  if(master === true){
   
    let url =  API_URL + "/master/by-id?type=" + listUrl

     
      
   
    return axios.get(url, { headers: authHeader() });
  }

  return axios.get(url, { headers: authHeader() });
};


const register = (data, postUrl,master) => {
  let orgUnitId = localStorage.getItem('org_unit_id');
  //console.log("Org: " + orgUnitId);
  let url =  API_URL + "/" + postUrl + "/register?org="+orgUnitId
  if(master === true){
     url =  API_URL + "/master/register?type=" + postUrl + "&org=" + orgUnitId
  }
  

  return axios.post(url, data);
};

const createJsonData = () => {
  let orgUnitId = localStorage.getItem('org_unit_id');
 
     const url =  API_URL + "/chat-gpt/create-json-data"
    const data = {}
    

    return axios.post(url,data);
};



const edit = (data, postUrl,master) => {
  let url =  API_URL + "/" + postUrl + "/edit"

  if(master === true){
     url =  API_URL + "/master/edit?type=" + postUrl
  }

  return axios.post(url , data);
};

const deleteRow = (id, postUrl,master) => {
  let url =  API_URL + "/" + postUrl + "/delete?id=" + id
  if(master === true){
     url =  API_URL + "/master/delete?type=" + postUrl + "&id=" + id
  }

  return axios.get(url);
};

const ListValue= (listUrl) => {

  let url =  API_URL + "/" + listUrl
  
  

  return axios.get(url, { headers: authHeader() });
};

export default {
  getAll,
  getById,
  register,
  edit,
  deleteRow,
  ListValue,
  createJsonData,
  exportData
  
};
