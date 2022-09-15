import React from 'react';
import Header from "../SharedComponent/Header/header";
import NavBar from "../SharedComponent/NavBar/navBar";
import CustomBreadcrumbs from "../SharedComponent/CustomBreadcrumbs/breadcrumbs";
import {useSelector} from "react-redux";
import Footer from "../SharedComponent/Footer/footer";

export default function Layout(props) {

    let {dashboard} = useSelector(({Reducers})=> Reducers)

    return (
        <div className="main-container">
            <div className="header-hld">
                <Header handleToggle/>
            </div>
            
            {/* <div className="breadcrumbs-holder">
                <CustomBreadcrumbs breadcrumbs={dashboard.Breadcrumbs}/>
            </div> */}
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
        </div>
    );
};