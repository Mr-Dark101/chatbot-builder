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
        console.log(window.location.pathname)
        if(dashboard.currentUser !== 0 || localStorage.getItem("userId") !== null){
            if(window.location.pathname === "/"){
                window.onloadend = () => {
                    history.push(`${STRINGS.ROUTES.ROOT}?org=${localStorage.getItem("userId")}`);
                }
            }else{
                window.onload = () => {
                    history.push(`${STRINGS.ROUTES.SETTINGS}?org=${localStorage.getItem("userId")}`);
                }
            }
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