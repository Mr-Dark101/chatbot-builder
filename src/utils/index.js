import { intersection } from 'lodash';
import { isExpired, decodeToken } from "react-jwt";
import AuthService from "../services/auth.service";
import toastr from 'toastr';

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


export function generateToast(title, msg) {
	toastr.options = {
		"closeButton": true,
		"debug": false,
		"newestOnTop": false,
		"progressBar": true,
		"preventDuplicates": true,
		"onclick": null,
		"showDuration": "100",
		"hideDuration": "1000",
		"timeOut": "8000",
		"extendedTimeOut": "1000",
		"showEasing": "swing",
		"hideEasing": "linear",
		"showMethod": "show",
		"hideMethod": "hide",
		"positionClass": "toast-top-center"
	};

	toastr.success(title, msg, {
		closeButton: true,
		tapToDismiss: false,
	});
}