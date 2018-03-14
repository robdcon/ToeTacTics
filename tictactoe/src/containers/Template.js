import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import NavDrawer from '../components/NavDrawer' 
//import CardExpandable from 'material-ui/Card/CardExpandable'
import {Header, Main} from '../styled/Template'

class Template extends Component 
{
	render()
	{
		return(

			<MuiThemeProvider>

				<div>

					 <NavDrawer 

					 />

					 <Header>
						 ToeTacTics
					 </Header>

					<Main>
						{this.props.children}
					</Main>

				</div>

			</MuiThemeProvider>

		)
	}
}

export default Template