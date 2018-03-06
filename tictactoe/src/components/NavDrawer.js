import React, {Component} from 'react'
import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import MenuItem from 'material-ui/MenuItem'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Menu from 'material-ui/svg-icons/navigation/menu'
import {Link} from 'react-router'


class NavDrawer extends Component
{

	state = 
	{
		open:false
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

				<FloatingActionButton
				onClick={this.toggle}
				>
					<Menu/>
				</FloatingActionButton>

				<Drawer
					open={this.state.open}
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