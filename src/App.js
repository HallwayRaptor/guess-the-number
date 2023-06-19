import React, { useEffect, useRef, useState } from "react";

export default function App() {
	//Random Number
	const generateRandomNumber = () => Math.floor(Math.random() * 100) + 1;
	const decrement = () => {
		setGuess((currentGuess) => {
			if (currentGuess > 1) {
				return Number(currentGuess) - 1;
			} else {
				return currentGuess;
			}
		});
	};
	const increment = () => {
		setGuess((currentGuess) => {
			if (currentGuess < 100) {
				return Number(currentGuess) + 1;
			} else {
				return currentGuess;
			}
		});
	};
	// state variables
	const [targetNumber, setTargetNumber] = useState(generateRandomNumber);
	const [guess, setGuess] = useState("");
	const [message, setMessage] = useState("");
	const [gameOver, setGameOver] = useState(false);
	const [guessCount, setGuessCount] = useState(0);

	// handlers
	const handleChange = (event) => {
		const newGuess = Number(event.target.value);
		setGuess(newGuess > 100 ? 100 : newGuess);
	};

	const handleSliderChange = (event) => {
		setGuess(Number(event.target.value));
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
				handleSliderChange={handleSliderChange}
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
	handleSliderChange,
}) => {
	const [isIncrementing, setIsIncrementing] = useState(false);
	const [isDecrementing, setIsDecrementing] = useState(false);

	const incrementInterval = useRef();
	const decrementInterval = useRef();

	const handleMouseDown = (direction) => {
		if (direction === "increment") {
			increment();
			setIsIncrementing(true);
		} else {
			decrement();
			setIsDecrementing(true);
		}
	};

	useEffect(() => {
		if (isIncrementing) {
			incrementInterval.current = setInterval(increment, 200);
		}
		return () => clearInterval(incrementInterval.current);
	}, [isIncrementing, increment]);

	useEffect(() => {
		if (isDecrementing) {
			decrementInterval.current = setInterval(decrement, 200);
		}
		return () => clearInterval(decrementInterval.current);
	}, [isDecrementing, decrement]);

	return (
		<form onSubmit={onSubmit}>
			<div className="input-slider-container">
				<div className="slider-container">
					<input
						type="range"
						min="1"
						max="100"
						value={guess}
						onChange={handleSliderChange}
					/>
				</div>
				<div className="number-input-container">
					<button
						type="button"
						onMouseDown={() => handleMouseDown("decrement")}
						onMouseUp={() => setIsDecrementing(false)}
						onMouseLeave={() => setIsDecrementing(false)}
						disabled={gameOver}
					>
						-
					</button>
					<input
						type="number"
						value={guess}
						onChange={onChange}
						min="1"
						max="100"
					/>

					<button
						type="button"
						onMouseDown={() => handleMouseDown("increment")}
						onMouseUp={() => setIsIncrementing(false)}
						onMouseLeave={() => setIsIncrementing(false)}
						disabled={gameOver}
					>
						+
					</button>
				</div>
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
};
const GameMessage = ({ message, guessCount, gameOver }) => (
	<div>
		<p>{guessCount === 0 ? "" : `Guesses ${guessCount}`}</p>
		<p>{guessCount === 69 ? "Nice" : message}</p>
	</div>
);
