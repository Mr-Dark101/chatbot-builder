import axios from "axios";

// const BASE_URL = `http://13.214.26.9:8080`;
<<<<<<< HEAD
const BASE_URL = `http://localhost:3030`;
=======
const BASE_URL = `https://637a-111-119-183-11.ngrok.io`;
>>>>>>> bf68b289d298eb7daa7b60b2c2797f013deaa834

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