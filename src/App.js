import React,{useState,useContext,useMemo} from "react";
import axios from "axios";
import { ToastContainer, toast,Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Provider} from "react-redux";
import store from "./store";
import {Suspense} from "react";
import {BrowserRouter} from "react-router-dom";
import "./App.scss";
import 'antd/dist/antd.min.css'
import Layout from "./Layouts/layout";
import { isExpired, decodeToken } from "react-jwt";
import { UserContext } from "./context/UserContext";
//import "bootstrap/dist/css/bootstrap.min.css";
//import "./App.css";

//import "./Style.css";
import Navigation from "./Navigator/navigation.js"

import Routes from './routes';




const App = () => {
 const token = (localStorage.getItem("user")) ? decodeToken(JSON.parse(localStorage.getItem("user")).accessToken) : null;
  const [user, setUser] = useState(token);
const value = useMemo(() => ({ user, setUser }), [user, setUser]);

const [loader, setLoader] = useState(false);
//const { user, setUser } = useContext(UserContext);
 


axios.interceptors.request.use(
    config => {
       // const token = localStorage.getItem('user');
        const user = JSON.parse(localStorage.getItem('user'));
       
        setLoader(true)
        if (user) {
            config.headers['x-access-token'] =  user.accessToken;
        }
        config.headers['Content-Type'] = 'application/json';

        return config;
    },
   
    error => {
        alert("test s")
         setLoader(false)
        Promise.reject(error)
});


axios.interceptors.response.use((response) => { // block to handle success case
    setLoader(false)
   

    return response
 }, function (error) { // block to handle error case

    alert("Test")
    const originalRequest = error.config;
     setLoader(false)

    if (error.response.status === 403 || error.response.status === 401) { // Added this condition to avoid infinite loop 

        
        localStorage.removeItem("user")
        
        window.location.replace('https://eoceanwab.com/eoceanwab/notification/errorMessage');
        // Redirect to any unauthorised route to avoid infinite loop...
        return Promise.reject(error);
    }


    
     
 
    
    return Promise.reject(error);
});

  return (


    <>
    <Provider store={store}>
            <BrowserRouter>
                <Suspense fallback={<div>Loading...</div>}>
                <UserContext.Provider value={value}>
                    <Layout>
                        
                            <Navigation/>
                       
                    </Layout>
                    <ToastContainer style={{width:'auto'}} position="top-center"
                        autoClose={3000} 
                        hideProgressBar
                        transition={Slide}

                        />
                     </UserContext.Provider>
                </Suspense>
            </BrowserRouter>
        </Provider>
    </>
  );
};

export default App;
