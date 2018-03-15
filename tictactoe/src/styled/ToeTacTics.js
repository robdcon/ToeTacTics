import React from 'react'
import {Layer, Line, Text, Rect} from 'react-konva'

export const Board = ({unit, size, rows}) =>
{
	let grid = []
	let stroke = '#bbb'
	let strokeWidth = 10

	for(let i = 1; i < rows; i++)
	{
		let position = unit*i

		grid.push(

			<Line

				points={[position, 0, position, size]}
				stroke={stroke}
				strokeWidth = {strokeWidth}
				key={i + 'x'}
			>

			</Line>
		)

		grid.push(

			<Line

				points={[0, position, size, position]}
				stroke={stroke}
				strokeWidth = {strokeWidth}
				key={i + 'y'}
			>

			</Line>
		)
	}

	return(

		<Layer>
			{grid}
		</Layer>

		)
}

export const Squares = (

	{unit, coordinates, gameState, gameOver, yourTurn, ownMark, win, move}

) =>
{

	let squares = coordinates.map( (position, index) => 
	{

		let makeMove = move
		let mark = gameState[index]
		let fill = 'black'
		if(win && win.includes(index))
		{
			fill = 'blue'
		}
		if (gameOver || !yourTurn || mark) 
		{
			makeMove = () => console.log('nope!')
		}

		return (

		 	<Text
				key={index}
				index={index}
				x={position[0]}
				y={position[1]}
				fontSize = {unit}
				width={unit}
				text={mark}
				fill={fill}
				fontFamily={'Helvetica'}
				align={'center'}

				onClick={(event)=>
				{
					let index = event.target.index
					makeMove(index, ownMark)
				}}
				onTap={(event)=>
				{
					let index = event.target.index
					makeMove(index, ownMark)
				}}
			/>
		)
	})

	return(

		<Layer>
		{squares}
		</Layer>
	)
}

