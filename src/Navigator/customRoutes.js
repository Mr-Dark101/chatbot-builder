import React from 'react';
import {Redirect, Route} from "react-router-dom";
import {STRINGS} from "../utils/base";

const CustomRoutes = (props) => {
    const renderRoutes = () => {
        let isAuth = true
        let {path, exact, component, isPrivate} = props;

        
        
        const query = new URLSearchParams(props.location.search);
        const urlAuthToken = query.get('access_token');
        const loggedInToken = localStorage.getItem('user');
        if(loggedInToken && urlAuthToken && (loggedInToken.accessToken !== urlAuthToken)){
            localStorage.clear();
        }
        
        if (!isPrivate) {
            return <Route path={path} exact={exact} component={component}/>
        } else {
            if (isAuth) {
                return <Route path={path} exact={exact} component={component}/>
            } else {
                return <Redirect to={`${STRINGS.ROUTES.ROOT}?org=${localStorage.getItem("userId")}`}/>
            }
        }
    }
    return (
        renderRoutes()
    );
};

export default CustomRoutes;