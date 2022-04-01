import React, { useState, useEffect } from 'react';
import styles from './AnagramGame.module.scss';
import AnagramBlocks from './AnagramBlocks';
import AnswerBlocks from './AnswerBlocks';
import LetterBlocks from './LetterBlocks';
import { shuffleArray } from '../../utils';

const AnagramGame = () => {
	const answer = 'BREAD';
	const ansArr = Array.from(answer);
	const ansArrToShuffle = Array.from(answer);

	const [selectedLetter, setSelectedLetter] = useState('');
	const [activeBlock, setActiveBlock] = useState(0);
	const [blockArr, setBlockArr] = useState(['', '', '', '', '']);
	const [anagramArr, setAnagramArr] = useState([]);
	const [isBlockArrFull, setIsBlockArrFull] = useState(false);
	const [message, setMessage] = useState('');

	const handleLetterOnClick = (e) => {
		setSelectedLetter(e.target.value);
		const updatedBlockArr = [...blockArr];
		updatedBlockArr[activeBlock] = e.target.value;
		setBlockArr(updatedBlockArr);
	};

	const handleBlockOnClick = (e) => {
		setActiveBlock(e.target.id);
	};

	const newGame = () => {
		setBlockArr(['', '', '', '', '']);
		setActiveBlock(0);
        const shuffledArr = shuffleArray(ansArrToShuffle);
		setAnagramArr(shuffledArr);
	};
	console.log('answer', answer);
	console.log('ansArr', ansArr);

	useEffect(() => {
		console.log('answer', answer);
		console.log('ansArr', ansArr);
		const shuffledArr = shuffleArray(ansArrToShuffle);
		setAnagramArr(shuffledArr);
	}, []);

	useEffect(() => {
		if (!blockArr.includes('')) setIsBlockArrFull(true);
	}, [blockArr]);

	useEffect(() => {
		const tempArr: boolean[] = blockArr.map((item, index) =>
			ansArr[index] !== item ? false : true
		);
		const findFalse = tempArr.find((item) => item === false);

		if (findFalse === undefined) newGame();
	}, [blockArr]);

	return (
		<>
			{console.log('ansArr', ansArr)};
			{console.log('anagramArr', anagramArr)}
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
			{message}
		</>
	);
};

export default AnagramGame;
