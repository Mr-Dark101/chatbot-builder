import { intersection } from 'lodash';
import { isExpired, decodeToken } from "react-jwt";
import AuthService from "../services/auth.service";

export function isLoggedIn() {
	/*
		* Note:
		*  This app assume if local storage have roles it means
		*  user is authenticated you can update this logic as per your app.
	*/

	console.log(localStorage.getItem('user'))
	
	return !!localStorage.getItem('user')
}

export function isArrayWithLength(arr) {
	return (Array.isArray(arr) && arr.length)
}



export function getAllowedRoutes(routesd) {
	
	

	const token = JSON.parse(localStorage.getItem("user")).accessToken;
	let userd = decodeToken(token);
	userd = userd.userdata;
	const roles = userd.xpermission.fulfillmentValue;
	const routes = userd.xpermission.fulfillmentValue;
	if(!routes){
		return false;
	}
	return routes.filter(({ permission }) => {
		
		if(!permission) return true;
		else if(!isArrayWithLength(permission)) return true;
		else return intersection(permission, roles).length;
	});

	
}
