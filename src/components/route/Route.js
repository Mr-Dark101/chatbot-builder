import React from "react";
import { Switch, Route} from "react-router-dom";
import AuthService from "../../services/auth.service";
import EventBus from "../../common/EventBus";


import Register from "../../components/Register";
import Home from "../../components/Home";
import Profile from "../../components/Profile";
import Dashboard from "../../pages/Dashboard";
import Clinic from "../../pages/Clinic";
import Setting from "../../pages/Setting";
import BoardUser from "../../components/BoardUser";
import BoardModerator from "../../components/BoardModerator";
import BoardAdmin from "../../components/BoardAdmin";
import Login from "../../components/Login";

const RouteNav = () => {
  

// Not use


  return (
    <div className="content-wrapper" >
            <div className="container-full">
              <Switch>
                <Route exact path={["/", "/home"]} component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/clinic" component={Clinic} />
                <Route exact path="/setting" component={Setting} />
                <Route path="/user" component={BoardUser} />
                <Route path="/mod" component={BoardModerator} />
                <Route path="/admin" component={BoardAdmin} />
              </Switch>
            </div>
    </div>
      
  );
};

export default RouteNav;