import React from 'react';
import DrawerComponent from "../Drawer";
import {useDispatch, useSelector} from "react-redux";
import {toggleNavbar} from "./slices/navbar.slice";
import home_icon from "../../assets/Image 1/DCLogoVector2.svg";
import analysis_icon from "../../assets/Image 1/analytics.svg";
import chat_icon from "../../assets/Image 1/chat-manager.svg";
import chatBotFace_icon from "../../assets/Image 1/chatbot.svg";
import chatbot_builder from "../../assets/Image 1/chatbot-builder.svg";
import teams_icon from "../../assets/Image 1/campign-manager.svg";
import users_icon from "../../assets/Image 1/whatsapp.svg";
import tags_icon from "../../assets/Image 1/contacts.svg";
import {STRINGS} from "../../utils/base";


import {
  
  Link
} from "react-router-dom";

const navbarData = [
    {
        icon: home_icon,
        value: "Home",
        isBlank: false,
        route: `${STRINGS.ROUTES.ROOT}?org=${localStorage.getItem("userId")}`
    },
    {
        icon: analysis_icon,
        value: "Insights",
        isBlank: true,
        route: `http://localhost:8090/eoceanwab/customerstatistics/index`
    },
    {
        icon: chat_icon,
        value: "Chat Manager",
        isBlank: true,
        route: `http://localhost:8090/eoceanwab/chatmanager/index`
    },
    {
        icon: chatBotFace_icon,
        value: "Chatbot",
        isBlank: true,
        route: `http://localhost:8090/eoceanwab/chatbotbuilder/index`
    },
    {
        icon: chatbot_builder,
        value: "Chatbot builder",
        isBlank: true,
        route: `http://localhost:8090/eoceanwab/chatbotbuilder/index`
    },
    {
        icon: teams_icon,
        value: "Profile Settings",
        isBlank: true,
        route: ` http://localhost:8090/eoceanwab/Settings/profilesettings`
    },
    {
        icon: users_icon,
        value: "Settings",
        isBlank: false,
        route: `${STRINGS.ROUTES.SETTINGS}?org=${localStorage.getItem("userId")}`
    },
    
    {
        icon: tags_icon,
        value: "What's New",
        isBlank: true,
        route: `http://localhost:8090/eoceanwab/whatsnew/index`
    },

]

const NavBar = () => {


    const navbar = useSelector(({Reducers}) => Reducers.navbar)
    let {open} = navbar;

    const dispatch = useDispatch();
 
    const toggleDrawer = () => {
        dispatch(toggleNavbar(false))
    }

   


    // return (
       
        
    //     <>
            

    //     <DrawerComponent open={open} data={navbarData} direction={"left"} toggleDrawer={toggleDrawer}/>
    //     </>
        
    // )
    return (
        <div className="nav-bar-cont">
            <div className="nLink-group">
                

                <Link to={`${STRINGS.ROUTES.ROOT}?org=${localStorage.getItem("userId")}`} className="nLink">
                    <div className="icon"><img alt={"#"} src={chat_icon}/></div>
                    <div/>
                </Link>
                
            </div>
            <div className="nLink-group">
                

            <Link to="/settings" className="nLink">
                    <div className="icon"><img alt={"#"} src={tags_icon}/></div>
                    <div/>
                </Link>
               
            </div>
        </div>
    );
};

export default NavBar;