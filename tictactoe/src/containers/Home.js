import React, {Component} from 'react'

// General template for each page 

class Home extends Component 
{
	render()
	{
		return(

			<div>

				<h2>Home</h2>
				<main>
					{this.props.children}
				</main>

			</div>

			)
	}
}

export default Home