import React, { memo,useContext } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { NotFound } from '../components/common';
import { UserContext } from "../context/UserContext";
import {lazy} from "react";
import {
	
	Customer,
	Setting,
	Bot
	
} from '../components';

const Dashboard = lazy(() => import("../components/Dashboard/dashboard"));
/*
* This is the route utility component used for generating
* routes and child routes it only requires routes array and basePath
*/


 function MapAllowedRoutes({routes, basePath, isAddNotFound}) {
	const match = useRouteMatch(basePath);
	const { user, setUser } = useContext(UserContext);

	console.log(user.userdata.is_superadmin)
	
	
	
	
			return (
				<Switch>

				
					

					

					
						<Route exact path="/app/dashboard" exact component={Dashboard} />
					
					{(user.userdata.is_superadmin == 1) ? (

						<>

						<Route exact path="/app/customer" component={Customer} />
					

					
						<Route  path="/app/customer/:id" component={Customer} />
					


					


					
							<Route path="/app/setting" component={Setting} />

						</>

					) : (

						<>
							<Route exact path="/app/bot" component={Dashboard} />
						</>
					)}

					
						
					


					
						
					

					{isAddNotFound && <Route><NotFound /></Route>}
				</Switch>
			)
		
}

export default memo(MapAllowedRoutes);
