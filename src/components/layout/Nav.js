import React, { useState, useEffect,useContext } from "react";
import { Switch, Route, Link } from "react-router-dom";
import AuthService from "../../services/auth.service";
import EventBus from "../../common/EventBus";
import { UserContext } from "../../context/UserContext";
import { isExpired, decodeToken } from "react-jwt";
import Header from "./Header";
const Nav = (props) => {
  

  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

// const { user } = useContext(UserContext);
const user  = decodeToken(JSON.parse(localStorage.getItem("user")).accessToken);

    
  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  useEffect(() => {

    
    

    if (user) {
      setCurrentUser(user);
      //setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      //setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);


  return (
    <>
    {user && (
      <>
      <Header currentUser={currentUser} props={props} logOut={logOut} />
      
</>
    

      )
    }

    
      </>
  );
};

export default Nav;