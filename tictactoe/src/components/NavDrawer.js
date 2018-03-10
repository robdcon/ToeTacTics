import React, {Component} from 'react'
import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import MenuItem from 'material-ui/MenuItem'
import {Link} from 'react-router'
import {NavToggleButton} from '../styled/NavDrawer'


class NavDrawer extends Component
{

	state = 
	{
		open:false,
		width: 250
	}

	// Toggle open/close
	toggle = () =>
	{
		this.setState((prevState, props) => 
		{
			return {open:!prevState.open}
		})
	}

	render()
	{
		return(
  
			<div>

				<NavToggleButton
					onClick={this.toggle}
					width={this.state.width}
					open={this.state.open}
				/>

				<Drawer
					open={this.state.open}
					width={this.state.width}
				>

					<div
						style=
						{{
							height:'100px',
							width:'100%',
							backgroundColor:'grey'
						}}
					>
						Login

					</div>

					<Divider/>

					<Link
						to={'/'}
						onClick={this.toggle}
					>
						<MenuItem
							primaryText={'Play'}
						/>
					</Link>

					<Link
						to={'/profile'}
						onClick={this.toggle}
					>
						<MenuItem
							primaryText={'Profile'}
						/>
					</Link>
					
				</Drawer>

			</div>

		)
	}
} 

export default NavDrawer