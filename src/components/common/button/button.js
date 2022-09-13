import React,{useContext} from "react";
import ReactDOM from "react-dom";
import { isExpired, decodeToken } from "react-jwt";
import { Link,History } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
export function Button(props) {
    const { name, title, placeholder,permissionKey, ...rest } = props

    const user  = decodeToken(JSON.parse(localStorage.getItem("user")).accessToken);


    const routes = user.userdata.user_permission.fulfillmentValue;
    const superadmin = user.userdata.is_superadmin;
    let obj = true;//routes.find(o => o.permission_key === permissionKey);
    if(superadmin === 1){
         obj = true;
    }
    
    
    return (
        <>
            {(obj && 
            <button

            {...rest}
            >{title}</button>
            )}
            
        </>
    )
}


export function LinkCustom(props) {
    const { name, title, placeholder,permissionKey, ...rest } = props

    const user  = decodeToken(JSON.parse(localStorage.getItem("user")).accessToken);

    const routes = user.userdata.user_permission.fulfillmentValue;
    let obj = true ;//routes.find(o => o.permission_key === permissionKey);

    const superadmin = user.userdata.is_superadmin;

    if(superadmin === 1){
         obj = true;
    }
    
    return (
        <>
            {obj ? (
            <Link

            {...rest}
            >{title}</Link>
            ) : title}
            
        </>
    )
}