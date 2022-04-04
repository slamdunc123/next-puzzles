import React, { useState, useEffect, MouseEvent } from 'react';
import AnagramBlocks from '../AnagramBlocks/AnagramBlocks';
import AnswerBlocks from '../AnswerBlocks/AnswerBlocks';
import LetterBlocks from '../LetterBlocks/LetterBlocks';
import { shuffleArray } from '../../utils';
import { wordsArr } from '../../constants/words';
import styles from './AnagramGame.module.scss';
import Timer from '../Timer/Timer';
import Controls from '../Controls/Controls';
import Overlay from '../Overlay/Overlay';

const clearedArr = ['', '', '', '', ''];
const secsVal = 5;

const newArr = wordsArr.map((item) => {
	return item.word;
});

const AnagramGame = () => {
	const [selectedLetter, setSelectedLetter] = useState('');
	const [activeBlock, setActiveBlock] = useState<number>(0);
	const [blockArr, setBlockArr] = useState(clearedArr);
	const [anagramArr, setAnagramArr] = useState([]);
	const [message, setMessage] = useState('');
	const [score, setScore] = useState(0);
	const [ansArr, setAnsArr] = useState<string[]>([]);
	const [isGameInPlay, setIsGameInPlay] = useState(false);
	const [isTimerOn, setIsTimerOn] = useState(false);
	const [secs, setSecs] = useState(secsVal);
	const [skip, setSkip] = useState(0);

	const handleLetterOnClick = (e: MouseEvent<HTMLButtonElement>) => {
		setSelectedLetter((e.target as HTMLButtonElement).value);
		const updatedBlockArr = [...blockArr];
		if (activeBlock !== blockArr.length) {
			updatedBlockArr[activeBlock] = (
				e.target as HTMLButtonElement
			).value;
			setBlockArr(updatedBlockArr);
			setActiveBlock((prevActiveBlock) => prevActiveBlock + 1);
		}
	};
	const handleDeleteOnClick = () => {
		const updatedBlockArr = [...blockArr];
		if (activeBlock !== 0) {
			updatedBlockArr[activeBlock - 1] = '';
			setBlockArr(updatedBlockArr);
			setActiveBlock((prevActiveBlock) => prevActiveBlock - 1);
		}
	};

	const handlePlayOnClick = () => {
		getFirstWord();
		setBlockArr(clearedArr);
		setActiveBlock(0);
		setIsGameInPlay(true);
		setIsTimerOn(true);
		setSecs(secsVal);
		setScore(0);
		setSkip(0);
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

		const wordArr = Array.from(randomWord);
		setAnsArr(wordArr);

		const wordArrToShuffle = Array.from(randomWord);
		// setAnsArrToShuffle(wordArrToShuffle);

		const shuffledArr = shuffleArray(wordArrToShuffle);
		setAnagramArr(shuffledArr);
	};

	const handleSkipOnClick = () => {
		getFirstWord();
		setBlockArr(clearedArr);
		setActiveBlock(0);
		setSkip((prevSkip) => prevSkip + 1);
	};

	const handleClearOnClick = () => {
		setBlockArr(clearedArr);
		setActiveBlock(0);
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
		setMessage('');
		if (secs === 0) {
			setIsGameInPlay(false);
			setIsTimerOn(false);
			setBlockArr(clearedArr);
			setActiveBlock(0);
			setMessage('Game Over');
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
			{secs === 0 && <Overlay message={message} />}
			<h3>Anagram Game</h3>

			<Controls
				isTimerOn={isTimerOn}
				handlePlayOnClick={handlePlayOnClick}
				handleClearOnClick={handleClearOnClick}
				handleSkipOnClick={handleSkipOnClick}
			/>

			<AnagramBlocks
				anagramArr={isGameInPlay ? anagramArr : clearedArr}
				selectedLetter={selectedLetter}
			/>
			<AnswerBlocks activeBlock={activeBlock} blockArr={blockArr} />
			<LetterBlocks
				ansArr={isTimerOn ? ansArr : clearedArr}
				handleLetterOnClick={handleLetterOnClick}
				handleDeleteOnClick={handleDeleteOnClick}
			/>
			{`Score = ${score}`}
			{`Skipped = ${skip}`}
			<Timer secs={secs} />
			{secs === 0 && <div>{`You scored ${score}`}</div>}
			{secs === 0 && <div>{ansArr}</div>}
		</>
	);
};

export default AnagramGame;
