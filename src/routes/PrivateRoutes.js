import React, { Fragment,useState,useEffect,Component,useContext } from 'react';
import { Redirect, useRouteMatch } from 'react-router-dom';
import { getAllowedRoutes, isLoggedIn } from '../utils';
import { PrivateRoutesConfig } from '../config';
import { TopNav } from '../components/common';
import Nav from "../components/layout/Nav";
import MapAllowedRoutes from '../routes/MapAllowedRoutes';
import RolesDataService from "../services/permission.service";

//import { UserContext } from "../context/UserContext";

function PrivateRoutes() {

	const [roleData, setRoleData] = useState([]);
	const [preConfig, setPreConfig] = useState([]);
	//const { user } = useContext(UserContext);

	 


	const retrieveRole = () => {
    RolesDataService.getAll()
      .then(response => {
      		
        	const dd = response.data.map((rs, index) => (

        		 {'title': capitalizeFirstLetter(rs.url),component:  capitalizeFirstLetter(rs.url),'path': '/' + rs.url,}
        	));
        	
        	setPreConfig(dd)
        
      })
      .catch(e => {
        console.log(e);
      });
  };

  const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


	const match = useRouteMatch('/app');

	let allowedRoutes = [];

		let newPreConfig = '';//JSON.parse(localStorage.getItem('user')).xpermission.fulfillmentValue;

	

	

	if (isLoggedIn()) allowedRoutes = getAllowedRoutes(newPreConfig);
	else return <Redirect to="/login" />;

	return (
		<Fragment>
			<Nav routes={allowedRoutes} prefix={match.path} className="bg-white" />
			<div className="container" >
									<MapAllowedRoutes routes={allowedRoutes} basePath="/app" isAddNotFound />
						
			</div>
		</Fragment>
	);
}

export default PrivateRoutes;
