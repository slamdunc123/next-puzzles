import React, { useState, useEffect, MouseEvent } from 'react';
import styles from './AnagramGame.module.scss';
import AnagramBlocks from './AnagramBlocks';
import AnswerBlocks from './AnswerBlocks';
import LetterBlocks from './LetterBlocks';
import { shuffleArray } from '../../utils';
import { wordsArr } from './words';

const AnagramGame = () => {
	const clearedArr = ['', '', '', '', ''];
	const secsVal = 10;

	const [selectedLetter, setSelectedLetter] = useState('');
	const [activeBlock, setActiveBlock] = useState<number>(0);
	const [blockArr, setBlockArr] = useState(clearedArr);
	const [anagramArr, setAnagramArr] = useState([]);
	const [isBlockArrFull, setIsBlockArrFull] = useState(false);
	const [message, setMessage] = useState('');
	const [result, setResult] = useState('');
	const [word, setWord] = useState('');
	const [score, setScore] = useState(0);
	const [ansArr, setAnsArr] = useState<string[]>([]);
	const [isGameInPlay, setIsGameInPlay] = useState(false);
	const [isTimerOn, setIsTimerOn] = useState(false);
	const [secs, setSecs] = useState(secsVal);

	const handleLetterOnClick = (e: MouseEvent<HTMLButtonElement>) => {
		setSelectedLetter((e.target as HTMLButtonElement).value);
		const updatedBlockArr = [...blockArr];
		updatedBlockArr[activeBlock] = (e.target as HTMLButtonElement).value;
		setBlockArr(updatedBlockArr);
	};

	const handleBlockOnClick = (e: MouseEvent<HTMLDivElement>) => {
		setActiveBlock(parseInt((e.target as HTMLDivElement).id));
	};

	const handlePlayOnClick = () => {
		getFirstWord();
		setIsGameInPlay(true);
		setIsTimerOn(true);
		setSecs(secsVal);
		setScore(0);
	};

	const nextGo = () => {
		setBlockArr(['', '', '', '', '']);
		setActiveBlock(0);
		setScore((prevScore) => prevScore + 1);
	};

	const getFirstWord = () => {
		// get a random word from array and make uppercase
		// create an array from random word and store in 2 variables
		// shuffle 1 variable to create anagram
		const randomWord =
			wordsArr[Math.floor(Math.random() * wordsArr.length)].toUpperCase();
		setWord(randomWord);

		const wordArr = Array.from(randomWord);
		setAnsArr(wordArr);

		const wordArrToShuffle = Array.from(randomWord);
		// setAnsArrToShuffle(wordArrToShuffle);

		const shuffledArr = shuffleArray(wordArrToShuffle);
		setAnagramArr(shuffledArr);
	};

	useEffect(() => {
		let interval;
		if (isTimerOn) {
			interval = setInterval(
				() => setSecs((prevSecs) => prevSecs - 1),
				1000
			);
		}

		return () => {
			clearInterval(interval);
		};
	}, [isTimerOn]);

	useEffect(() => {
		if (secs === 0) {
			setIsGameInPlay(false);
			setIsTimerOn(false);
		}
	}, [secs]);

	// checks for correct answer
	useEffect(() => {
		const tempArr: boolean[] = blockArr.map((item, index) =>
			ansArr[index] !== item ? false : true
		);
		const findFalse = tempArr.find((item) => item === false);

		if (findFalse === undefined) nextGo();
	}, [blockArr, ansArr]);

	useEffect(() => {
		getFirstWord();
	}, [score]);

	return (
		<>
			{console.log('ansArr', ansArr)}
			<h3>Anagram Game</h3>
			{!isTimerOn && <button onClick={handlePlayOnClick}>Play</button>}
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
				ansArr={isTimerOn ? ansArr : clearedArr}
				handleLetterOnClick={handleLetterOnClick}
			/>
			{`Score = ${score}`}
			<div>{secs}</div>
			{secs === 0 && <div>{`You scored ${score}`}</div>}
		</>
	);
};

export default AnagramGame;
