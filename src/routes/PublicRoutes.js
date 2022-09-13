import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login } from '../components';

function PublicRoutes() {
	return (
		<Fragment>
			<Switch>
				
				
				<Route exact path="/login">
					<Login />
				</Route>
				
			</Switch>
		</Fragment>
	)
}

export default PublicRoutes;
