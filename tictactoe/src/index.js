import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import {Router} from 'react-router'
import {browserHistory} from 'react-router'
import Routes from "./routes/"


ReactDOM.render(

	<Router

	history = {browserHistory}
	routes = {Routes}

	 />,

	  document.getElementById('root'));
registerServiceWorker();
