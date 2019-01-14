import React from 'react' 
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import {Router, browserHistory, applyRouterMiddleware} from 'react-router'
import Routes from './routes/'
import Relay from 'react-relay/classic'
import useRelay from 'react-router-relay'
import {RelayNetworkLayer, urlMiddleware} from 'react-relay-network-layer'
import relayApi from './config/endpoints'
import auth from './utils/auth'
import Environment from './routes/Environment'

////////////////////////
// ENVIRONMENT SET UP //
////////////////////////



const createHeaders = () =>
{
	let idToken = auth.getToken()
	console.log(`AUTH0-TOKEN:${idToken}`)
	if(idToken)
	{

		return {
			Authorization:`Bearer ${idToken}`

		}
	}
	else
	{
		return {}
	}
}

Relay.injectNetworkLayer
(
	new RelayNetworkLayer(
		[
			urlMiddleware(
			{
				url:(req)=>relayApi,
			}),
			next => req =>
			{
				req.headers = 
				{
					...req.headers,
					...createHeaders()
				}
				return next(req)
			},

		], {diableBatchQuery:true})
)


ReactDOM.render(

	<Router

	environment = {Relay.Store}
	render = {applyRouterMiddleware(useRelay)}
	history = {browserHistory}
	routes = {Routes}

	 />,

	  document.getElementById('root')
)

registerServiceWorker();
