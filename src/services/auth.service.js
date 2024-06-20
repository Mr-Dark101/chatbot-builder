import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URl + '/api/auth/';

const register = (username, email, password) => {
  return axios.post(API_URL + 'signup', {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + 'signin', {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        try {
          localStorage.setItem('user', JSON.stringify(response.data));
          localStorage.setItem('tenent_id', JSON.stringify(response.data.tenent_id));
          localStorage.setItem('org_unit_id', JSON.parse(response.data.org_unit_id));
          //Added a new attribute for retrieving Chatbot Plan
          localStorage.setItem('chatbot_plan', JSON.stringify(response.data.chatbotPlan));
        } catch (exc) {
          localStorage.setItem('user', JSON.stringify(response.data));
          localStorage.setItem('tenent_id', JSON.stringify(response.data.tenent_id));
          localStorage.setItem('org_unit_id', response.data.org_unit_id);
          //Added a new attribute for retrieving Chatbot Plan
          localStorage.setItem('chatbot_plan', JSON.stringify(response.data.chatbotPlan));
        }
        // dispatch(GetUserBots({userId: response.userId}))
      }

      return response.data;
    });
};

const loginbyuser = (username) => {
  debugger;
  return axios
    .get(API_URL + 'signinuser?access_token=' + username)
    .then((response) => {
      console.log({ response });
      //console.log('here')
      if (response.data.accessToken) {
        try {
          localStorage.setItem('user', JSON.stringify(response.data));
          localStorage.setItem('tenent_id', JSON.stringify(response.data.tenent_id));
          localStorage.setItem('org_unit_id', JSON.parse(response.data.org_unit_id));
          //Added a new attribute for retrieving Chatbot Plan
          localStorage.setItem('chatbot_plan', JSON.stringify(response.data.chatbotPlan));
        } catch (exc) {
          localStorage.setItem('user', JSON.stringify(response.data));
          localStorage.setItem('tenent_id', JSON.stringify(response.data.tenent_id));
          localStorage.setItem('org_unit_id', response.data.org_unit_id);
          //Added a new attribute for retrieving Chatbot Plan
          localStorage.setItem('chatbot_plan', JSON.stringify(response.data.chatbotPlan));
        }
        // dispatch(GetUserBots({userId: response.userId}))
      }

      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const loginToken = (username, password) => {
  return axios
    .post(API_URL + 'signin', {
      username,
      password,
    })
    .then((response) => {
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('userId');
  localStorage.removeItem('org_unit_id');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  loginToken,
  loginbyuser,
};
