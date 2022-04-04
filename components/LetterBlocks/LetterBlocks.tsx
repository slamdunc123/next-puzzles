import React, { MouseEvent } from 'react';
import styles from './LetterBlocks.module.scss';

const letters = 'QWERTYUIOPASDFGHJKLZXCVBNM';
const lettersArr = Array.from(letters);
const lettersTopArr = lettersArr.slice(0, 10); //QWERTYUIOP
const lettersMiddleArr = lettersArr.slice(10, 19); //ASDFGHJKL
const lettersBottomArr = lettersArr.slice(19, 26); // ZXCVBNM

interface LetterBlocksProps {
	ansArr: string[];
	handleLetterOnClick: (e: MouseEvent<HTMLButtonElement>) => void;
	handleDeleteOnClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const LetterBlocks = ({
	ansArr,
	handleLetterOnClick,
	handleDeleteOnClick,
}: LetterBlocksProps) => {
	return (
		<>
			<h5>Letter Blocks</h5>
			<div className={styles.buttonsContainer}>
				<div className={styles.buttonsRow}>
					{lettersTopArr.map((letter, index) => {
						return (
							<button
								className={
									ansArr.includes(letter)
										? styles.button
										: styles.buttonDisabled
								}
								key={index}
								value={letter}
								onClick={handleLetterOnClick}
								disabled={!ansArr.includes(letter)}
							>
								{letter}
							</button>
						);
					})}
				</div>
				<div className={styles.buttonsRow}>
					{lettersMiddleArr.map((letter, index) => {
						return (
							<button
								className={
									ansArr.includes(letter)
										? styles.button
										: styles.buttonDisabled
								}
								key={index}
								value={letter}
								onClick={handleLetterOnClick}
								disabled={!ansArr.includes(letter)}
							>
								{letter}
							</button>
						);
					})}
				</div>
				<div className={styles.buttonsRow}>
					{lettersBottomArr.map((letter, index) => {
						return (
							<button
								className={
									ansArr.includes(letter)
										? styles.button
										: styles.buttonDisabled
								}
								key={index}
								value={letter}
								onClick={handleLetterOnClick}
								disabled={!ansArr.includes(letter)}
							>
								{letter}
							</button>
						);
					})}
					<button
						className={styles.buttonDelete}
						onClick={handleDeleteOnClick}
					>
						del
					</button>
				</div>
			</div>
		</>
	);
};

export default LetterBlocks;
