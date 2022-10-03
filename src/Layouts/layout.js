import React from 'react';
import Header from "../SharedComponent/Header/header";
import NavBar from "../SharedComponent/NavBar/navBar";
import CustomBreadcrumbs from "../SharedComponent/CustomBreadcrumbs/breadcrumbs";
import {useSelector} from "react-redux";
import Footer from "../SharedComponent/Footer/footer";

export default function Layout(props) {

    let {dashboard} = useSelector(({Reducers})=> Reducers)

// console.log(window.location.pathname)

    return (
        <div className="main-container">

           {window.location.pathname == '/login' ? (<>



             
                
                
                    {props.children}
               
           


            </>) : (<>



             <div className="section-hld">
                <div className="nav-bar-hld">
                    <NavBar/>
                    
                </div>
                <div className="main-section">
                    {props.children}
                </div>
            </div>
            <div className="footer-hld">
                <Footer/>
            </div>

            </>)}
           
        </div>
    );
};