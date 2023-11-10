import React, {useEffect} from 'react';
import {Switch, useHistory,Redirect} from "react-router-dom";
import {routes} from "./routes";
import CustomRoutes from "./customRoutes";
import {STRINGS} from "../utils/base";
import {useSelector} from "react-redux";

const Navigation = () => {
    const history = useHistory();
    const dashboard = useSelector(({Reducers})=> Reducers.dashboard)
   
    useEffect(() => {


        //alert(dashboard.currentUser + " " + localStorage.getItem("userId"))
        if(localStorage.getItem("user") !== null){


             const query = new URLSearchParams(history.location.search);
             let _userName = query.get('username');;
             if(_userName){
               
                history.push(`${STRINGS.ROUTES.AUTH.LOGIN}?username=${_userName}`);
             }else{
                
                history.push(`${STRINGS.ROUTES.ROOT}?org=${localStorage.getItem("userId")}`);
             }
            
            // history.push(`${STRINGS.ROUTES.ROOT}?org=${localStorage.getItem("userId")}`);
            // if(window.location.pathname === "/"){
            //     window.onloadend = () => {
            //         history.push(`${STRINGS.ROUTES.ROOT}?org=${localStorage.getItem("userId")}`);
            //     }
            // }else{
            //     window.onload = () => {
            //         history.push(`${STRINGS.ROUTES.ROOT}?org=${localStorage.getItem("userId")}`);
            //         //history.push(`/settings?org=${localStorage.getItem("userId")}`);
            //     }
            // }
        }
        else{
            window.onload = () => {
                    history.push(`${STRINGS.ROUTES.AUTH.LOGIN}`);
                }
        }
    }, [history])
   
    return (
        <div className="content-hld">
           
            <Switch>
                {
                    
                    routes.map(({path, exact, component, isPrivate}) => {
                        return (
                            <CustomRoutes
                                key={path}
                                path={path}
                                exact={exact}
                                component={component}
                                isPrivate={isPrivate}
                            />
                        )
                    })
                }
            </Switch>
           
        </div>
    );
};

export default Navigation;