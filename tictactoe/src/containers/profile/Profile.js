import React, {Component} from 'react'

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