import React, { memo,useState,useMemo } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../utils/history';
import PrivateRoutes from './PrivateRoutes';
import Auth from './Auth';
import { isExpired, decodeToken } from "react-jwt";
import { UserContext } from "../context/UserContext";
function Routes() {


	
  const token = (localStorage.getItem("user")) ? decodeToken(JSON.parse(localStorage.getItem("user")).accessToken) : null;
  const [user, setUser] = useState(token);

  


  const value = useMemo(() => ({ user, setUser }), [user, setUser]);


	return (
		<Router history={history}>
			



			<Switch>
			<UserContext.Provider value={value}>
				<Route path="/app">
					<PrivateRoutes />
				</Route>
			
				<Route path="">
					<Auth />
				</Route>
				</UserContext.Provider>
			</Switch>


			
		</Router>
	)
}

export default memo(Routes);

