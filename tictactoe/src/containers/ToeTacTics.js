import React, {Component} from 'react'
import {Stage} from 'react-konva'
import {Board, Squares} from '../styled/ToeTacTics'

// General template for each page 

class ToeTacTics extends Component 
{
	state = 
	{
		rows:3,
		gameState: new Array(9).fill(false),
		ownMark: 'X',
		otherMark: '0',
		gameOver: false,
		yourTurn: true,
		winner: false,
		coordinates:[]
	}

	componentDidMount()
	{
		let height = window.innerHeight
		let width = window.innerWidth
		let size = (height < width) ? height*0.8 : width*0.8
		let rows = this.state.rows
		let unit = size/rows
		let coordinates = []

		for(let y = 0; y < rows; y++)
		{
			for(let x = 0; x < rows; x++)
			{
				coordinates.push([x*unit, y*unit])
			}
		}

		this.setState(
		{
			size,rows,unit,coordinates
		})
		
	}

	move = (marker, index) =>
	{
		console.log('Move made', marker, index)
	}

	makeAIMove = () =>
	{

	}

	turingTest = () =>
	{

	}

	renderGame = () =>
	{

	}

	render()
	{
		let {
			unit,
			size,
			rows,
			win,
			gameState,
			gameOver,
			yourTurn,
			ownMark,
			coordinates
		} = this.state
		
		return(

			<div>

				<Stage
					width={size}
					height={size}
				>

				<Board
					unit={unit}
					size={size}
					rows={rows}
				/>

				<Squares
					unit={unit}
					coordinates={coordinates}
					gameState={gameState}
					gameOver={gameOver}
					win={win}
					yourTurn={yourTurn}
					ownMark={ownMark}
					move={this.move}

				/>



				</Stage>

			</div>

			)
	}
}

export default ToeTacTics