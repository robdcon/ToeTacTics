import React, {Component} from 'react'
import {Container, Name, GameListHeader, GameList, GameRecord, Column, ColumnLabels} from '../styled/Profile'

// General template for each page 

class Profile extends Component 
{
	render()
	{
		return(

			<div>

				<main>
					{this.props.children}
				</main>

			</div>

			)
	}
}

export default Profile