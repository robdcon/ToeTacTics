import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectEventTapPlugin from 'react-tap-event-plugin'
import RaisedButton from 'material-ui/RaisedButton' 

class Template extends Component 
{
	render()
	{
		return(

			<MuiThemeProvider>

				<div>
				
					<header>

					 <h1>TicTacToe</h1>

					 <RaisedButton 

						label={"Push Me"}
						primary={true}
						onClick={()=>console.log('working')}
					 />

					 </header>

					<main>
						{this.props.children}
					</main>

				</div>

			</MuiThemeProvider>

		)
	}
}

export default Template