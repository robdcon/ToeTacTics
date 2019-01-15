import React from 'react' 
import {Route, IndexRoute} from 'react-router'
import Template from '../containers/Template'
import ToeTacTics from '../containers/ToeTacTics'
import Profile from '../containers/Profile'
import Relay from 'react-relay/classic'


const ViewerQueries = () => 
{
	viewer: () => Relay.QL`query {viewer}`
}

 const createRoutes = () => 
 {
 	return(
 		
		<Route
		path='/'
		component={Template}
		query={ViewerQueries}
		>
			
			<IndexRoute
			component={ToeTacTics}
			query={ViewerQueries}
			/>

			<Route
			path='/profile'
			component={Profile}
			query={ViewerQueries}
			/>

		</Route>

 		)
 }

 const Routes = createRoutes()

 export default Routes 