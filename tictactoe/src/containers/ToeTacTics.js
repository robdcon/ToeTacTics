import React, {Component} from 'react'
import {Stage} from 'react-konva'
import {Board, Squares} from '../styled/ToeTacTics'

// General template for each page 

class ToeTacTics extends Component 
{
	constructor(props)
	{
		super(props)
		this.combos = [

			

			[0,1,2],
			[3,4,5],
			[6,7,8],
			[0,3,6],
			[1,4,7],
			[2,5,8],
			[0,4,8],
			[2,4,6]

		]
	}

	state = 
	{
		rows:3,
		gameState: new Array(9).fill(false),
		ownMark: 'X',
		otherMark: 'O',
		gameOver: false,
		yourTurn: true,
		winner: false,
		coordinates:[],
		potentialWin:false,
		potentialWinningCombo:[]
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

	move = (index, marker) =>
	{

		this.setState((prevState,prop)=>
		{
			let { gameState, yourTurn, gameOver, winner } = prevState
			yourTurn = !yourTurn

			gameState.splice(index, 1, marker)


			let foundWin = this.winCheck(gameState) 		

			if(foundWin)
			{
				winner = gameState[foundWin[0]]
			}
			if(foundWin || !gameState.includes(false))
			{
				gameOver = true
			}
			
			if(!yourTurn && !gameOver)
			{
				this.makeAIMove(gameState)
			}

			return{yourTurn, gameState, gameOver, win: foundWin || false, winner}
		})	
		
	}

	random = (min, max) =>
	{
		min = Math.ceil(min)
		max = Math.floor(max)
		return Math.floor(Math.random()*(max-min)) + min
	}

	winCheck = (gameState) =>
	{

		let combos = this.combos

		return combos.find((combo)=>
		{

			let [a,b,c] = combo
			
			return ( (gameState[a] === gameState[b] && gameState[a] === gameState[c]) && gameState[a])

		})
	}

	canWinCheck = (gameState) =>
	{
		let opponent = this.state.ownMark
		let combos = this.combos
		let winningMove = false

		combos.forEach((combo)=>
		{
			
			let [a,b,c] = combo

			if((gameState[a] === opponent) && (gameState[b] === opponent)) 
			{
				if(gameState[c] === false)
				{
					winningMove = c
				}	
			
			}
			else if((gameState[a] === opponent) && (gameState[c] === opponent)) 
			{
				if(gameState[b] === false)
				{
					winningMove = b
				}	
			
			}
			else if((gameState[b] === opponent) && (gameState[c] === opponent)) 
			{
				if(gameState[a] === false)
				{
					winningMove = a
				}	
			
			}


		})
		return winningMove
		
	}

	makeAIMove = (gameState) =>
	{		

		let otherMark = this.state.otherMark				
		let canWinCheck = this.canWinCheck(gameState)
		let aiMove
		let openSquares = []
		
		if(canWinCheck === false)
		{
			gameState.forEach((square, index)=>
			{
				if(!square)
				{
					openSquares.push(index)
				}
			})
			aiMove = openSquares[this.random(0, openSquares.length)]

		}
		else 
		{
			aiMove = canWinCheck

		}
		setTimeout(()=>this.move(aiMove, otherMark), 1000)
				
		
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