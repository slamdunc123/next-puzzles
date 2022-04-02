import React, { useState, useEffect, MouseEvent } from 'react';
import styles from './AnagramGame.module.scss';
import AnagramBlocks from './AnagramBlocks';
import AnswerBlocks from './AnswerBlocks';
import LetterBlocks from './LetterBlocks';
import { shuffleArray } from '../../utils';
import { wordsArr } from './words';

const AnagramGame = () => {
	const clearedArr = ['', '', '', '', ''];

	const [selectedLetter, setSelectedLetter] = useState('');
	const [activeBlock, setActiveBlock] = useState<number>(0);
	const [blockArr, setBlockArr] = useState(clearedArr);
	const [anagramArr, setAnagramArr] = useState([]);
	const [isBlockArrFull, setIsBlockArrFull] = useState(false);
	const [message, setMessage] = useState('');
	const [word, setWord] = useState('');
	const [score, setScore] = useState(0);
	const [ansArr, setAnsArr] = useState<string[]>([]);
	const [isGameInPlay, setIsGameInPlay] = useState(false);

	const handleLetterOnClick = (e: MouseEvent<HTMLButtonElement>) => {
		setSelectedLetter((e.target as HTMLButtonElement).value);
		const updatedBlockArr = [...blockArr];
		updatedBlockArr[activeBlock] = (e.target as HTMLButtonElement).value;
		setBlockArr(updatedBlockArr);
	};

	const handleBlockOnClick = (e: MouseEvent<HTMLDivElement>) => {
		setActiveBlock(parseInt((e.target as HTMLDivElement).id));
	};

	const handleStartOnClick = () => {
		setIsGameInPlay(true);
	};

	const nextGo = () => {
		setBlockArr(['', '', '', '', '']);
		setActiveBlock(0);
		setScore((prevScore) => prevScore + 1);
	};

	// checks for correct answer
	useEffect(() => {
		const tempArr: boolean[] = blockArr.map((item, index) =>
			ansArr[index] !== item ? false : true
		);
		const findFalse = tempArr.find((item) => item === false);

		if (findFalse === undefined) nextGo();
	}, [blockArr, ansArr]);

	// get a random word from array and make uppercase
	// create an array from random word and store in 2 variables
	// shuffle 1 variable to create anagram

	useEffect(() => {
		const randomWord =
			wordsArr[Math.floor(Math.random() * wordsArr.length)].toUpperCase();
		setWord(randomWord);

		const wordArr = Array.from(randomWord);
		setAnsArr(wordArr);

		const wordArrToShuffle = Array.from(randomWord);
		// setAnsArrToShuffle(wordArrToShuffle);

		const shuffledArr = shuffleArray(wordArrToShuffle);
		setAnagramArr(shuffledArr);
	}, [score]);

	return (
		<>
			{console.log('ansArr', ansArr)}
			<h3>Anagram Game</h3>
			<button onClick={handleStartOnClick} disabled={isGameInPlay}>
				Start
			</button>
			<AnagramBlocks
				anagramArr={isGameInPlay ? anagramArr : clearedArr}
				selectedLetter={selectedLetter}
			/>
			<AnswerBlocks
				activeBlock={activeBlock}
				blockArr={blockArr}
				handleBlockOnClick={handleBlockOnClick}
			/>
			<LetterBlocks
				ansArr={ansArr}
				handleLetterOnClick={handleLetterOnClick}
			/>
			{/* {message} */}
			{`Score = ${score}`}
		</>
	);
};

export default AnagramGame;
