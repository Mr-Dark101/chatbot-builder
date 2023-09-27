import axios from 'axios';

// const BASE_URL = `http://13.214.26.9:8080`;

const BASE_URL = process.env.REACT_APP_BACKEND_URl;
const user = JSON.parse(localStorage.getItem('user'));
export const API = axios.create({
   baseURL: BASE_URL,
   timeout: 60000,
   headers: {
      'Content-Type': 'application/json',
      'x-access-token': user?.accessToken,
      
   },
})

export const APIORDER = axios.create({
   baseURL: BASE_URL,
   timeout: 60000,
   headers: {
      'Content-Type': 'application/json',
      'x-access-token': 'h04k3vv0HmT53oPBLlSxWIlTpI7cp6pL',
      'x-org-unit-id': 'eocean',
   },
});



export const APICHATGPT = axios.create({
   baseURL: 'https://api.openai.com/v1/',
   timeout: 60000,
   headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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',
   },
});