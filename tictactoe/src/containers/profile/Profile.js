import React, {Component} from 'react'

// General template for each page 

class Profile extends Component 
{
	render()
	{
		return(

			<div>

				<h2>Profile</h2>
				<main>
					{this.props.children}
				</main>

			</div>

			)
	}
}

export default Profile