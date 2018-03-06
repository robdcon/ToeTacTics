import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectEventTapPlugin from 'react-tap-event-plugin'
import NavDrawer from '../components/NavDrawer' 
import CardExpandable from 'material-ui/Card/CardExpandable'

class Template extends Component 
{
	render()
	{
		return(

			<MuiThemeProvider>

			<CardExpandable/>

				<div>

					 <NavDrawer 

					 />

					<main>
						{this.props.children}
					</main>

				</div>

			</MuiThemeProvider>

		)
	}
}

export default Template