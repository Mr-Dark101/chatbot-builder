import React from 'react';
import {Redirect, Route} from "react-router-dom";
import {STRINGS} from "../utils/base";

const CustomRoutes = (props) => {
    const renderRoutes = () => {
        let isAuth = true
        let {path, exact, component, isPrivate} = props;
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