import axios from "axios";

// const BASE_URL = `http://13.214.26.9:8080`;


const BASE_URL = `https://839d-119-160-2-46.ngrok.io`;





export const API = axios.create({
    baseURL: BASE_URL,
    timeout: 60000
})


export const APIORDER = axios.create({
    baseURL: BASE_URL,
    timeout: 60000,
    headers: {
    'Content-Type': 'application/json',
    'x-access-token': 'h04k3vv0HmT53oPBLlSxWIlTpI7cp6pL',
    'x-org-unit-id': 'eocean'
    }
},

)