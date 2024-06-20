import React,{useContext} from "react";
import { UserContext } from "../context/UserContext";
import { useJwt } from "react-jwt";

const Dashboard = () => {
 
const { user } = useContext(UserContext);

let tt = JSON.parse(localStorage.getItem('user')).accessToken;

  return (
    <div className="container-wrapper">



      <h3 className="h1">Dashboard</h3>

      
    </div>
  );
};

export default Dashboard;
