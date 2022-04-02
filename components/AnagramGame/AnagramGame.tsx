import React, { useState, useEffect } from 'react';
import styles from './AnagramGame.module.scss';
import AnagramBlocks from './AnagramBlocks';
import AnswerBlocks from './AnswerBlocks';
import LetterBlocks from './LetterBlocks';
import { shuffleArray } from '../../utils';
import { wordsArr } from './words';

const AnagramGame = () => {
	// const answer = 'BREAD';

	const [selectedLetter, setSelectedLetter] = useState('');
	const [activeBlock, setActiveBlock] = useState(0);
	const [blockArr, setBlockArr] = useState(['', '', '', '', '']);
	const [anagramArr, setAnagramArr] = useState([]);
	const [isBlockArrFull, setIsBlockArrFull] = useState(false);
	const [message, setMessage] = useState('');
	const [word, setWord] = useState('');
	const [score, setScore] = useState(0);
	const [ansArr, setAnsArr] = useState([]);
	const [ansArrToShuffle, setAnsArrToShuffle] = useState([]);

	const handleLetterOnClick = (e) => {
		setSelectedLetter(e.target.value);
		const updatedBlockArr = [...blockArr];
		updatedBlockArr[activeBlock] = e.target.value;
		setBlockArr(updatedBlockArr);
	};

	const handleBlockOnClick = (e) => {
		setActiveBlock(e.target.id);
	};

	const nextGo = () => {
		setBlockArr(['', '', '', '', '']);
		setActiveBlock(0);
		setScore((prevScore) => prevScore + 1);
	};
	console.log('ansArr', ansArr);

	// checks for correct answer to match the word
	useEffect(() => {
		const tempArr: boolean[] = blockArr.map((item, index) =>
			ansArr[index] !== item ? false : true
		);
		const findFalse = tempArr.find((item) => item === false);

		if (findFalse === undefined) nextGo();
	}, [blockArr]);

	// get a random word from array and make uppercase
	// create an array from random word and store in 2 variables
	// shuffle 1 variable to create anagram

	useEffect(() => {
		const randomWord =
			wordsArr[Math.floor(Math.random() * wordsArr.length)].toUpperCase();
		setWord(randomWord);

		const ansArr = Array.from(randomWord);
		setAnsArr(ansArr);

		const ansArrToShuffle = Array.from(randomWord);
		setAnsArrToShuffle(ansArrToShuffle);

		const shuffledArr = shuffleArray(ansArrToShuffle);
		setAnagramArr(shuffledArr);
	}, [score]);

	return (
		<>
			<h3>Anagram Game</h3>
			<AnagramBlocks
				anagramArr={anagramArr}
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
