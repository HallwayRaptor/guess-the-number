import React, { useState } from "react";

export default function App() {
	//Random Number
	const generateRandomNumber = () => Math.floor(Math.random() * 100) + 1;
	const decrement = () => {
		const currentGuess = guess === "" ? 0 : Number(guess);
		if (currentGuess > 1) {
			setGuess(currentGuess - 1);
		}
	};
	const increment = () => {
		const currentGuess = guess === "" ? 0 : Number(guess);
		if (currentGuess < 100) {
			setGuess(currentGuess + 1);
		}
	};
	// state variables
	const [targetNumber, setTargetNumber] = useState(generateRandomNumber);
	const [guess, setGuess] = useState("");
	const [message, setMessage] = useState("");
	const [gameOver, setGameOver] = useState(false);
	const [guessCount, setGuessCount] = useState(0);

	// handlers
	const handleChange = (event) => {
		const newGuess = event.target.value;
		setGuess(newGuess > 100 ? 100 : newGuess);
	};

	const handleReset = () => {
		setTargetNumber(generateRandomNumber);
		setGuess("");
		setMessage("");
		setGameOver(false);
		setGuessCount(0);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (guess === "") {
			setMessage("");
		} else {
			setGuessCount((count) => count + 1);
			if (guess == targetNumber) {
				setMessage(`You got it in ${guessCount + 1} tries`);
				setGameOver(true);
			} else {
				if (guess > targetNumber) {
					setMessage("Too high");
				} else if (guess < targetNumber) {
					setMessage("Too low");
				}
			}
		}
	};

	// App Body
	return (
		<div>
			<GameHeader />
			<GameFormArea
				guess={guess}
				onChange={handleChange}
				onSubmit={handleSubmit}
				onReset={handleReset}
				gameOver={gameOver}
				increment={increment}
				decrement={decrement}
			/>
			<GameMessage
				guessCount={guessCount}
				guess={guess}
				message={message}
				gameOver={gameOver}
			/>
		</div>
	);
}

const GameHeader = () => <h1>Guess the Number</h1>;
const GameFormArea = ({
	onChange,
	onSubmit,
	guess,
	onReset,
	gameOver,
	increment,
	decrement,
	handleDecrementMouseDown,
	handleIncrementMouseDown,
	handleMouseUp,
}) => (
	<form onSubmit={onSubmit}>
		<div className="number-input-container">
			<button type="button" onClick={decrement} disabled={gameOver}>
				-
			</button>
			<input
				type="number"
				value={guess}
				onChange={onChange}
				min="1"
				max="100"
				className="no-spin"
			/>
			<button type="button" onClick={increment} disabled={gameOver}>
				+
			</button>
		</div>
		{gameOver ? (
			<button type="button" onClick={onReset}>
				Reset
			</button>
		) : (
			<button type="submit">Guess</button>
		)}
	</form>
);
const GameMessage = ({ message, guessCount, gameOver }) => (
	<div>
		<p> {guessCount === 0 ? "" : `Guesses ${guessCount}`} </p>
		<p>{message}</p>
	</div>
);
