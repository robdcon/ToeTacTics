import React from 'react' 
import {Route, IndexRoute} from 'react-router'
import Template from '../containers/Template'
import Home from '../containers/Home'
import Profile from '../containers/profile/Profile'

 const createRoutes = () => 
 {
 	return(
 		// Template component from root source is passed page
		<Route
		path='/'
		component={Template}
		>
			// Home component
			<IndexRoute
			component={Home}
			/>

			<Route
			path='/profile'
			component={Profile}
			/>

		</Route>

 		)
 }

 const Routes = createRoutes()

 export default Routes 