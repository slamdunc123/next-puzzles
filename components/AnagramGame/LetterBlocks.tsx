import React, { MouseEvent } from 'react';
import styles from './LetterBlocks.module.scss';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lettersArr = Array.from(alphabet);

interface LetterBlocksProps {
	ansArr: string[];
	handleLetterOnClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const LetterBlocks = ({ ansArr, handleLetterOnClick }: LetterBlocksProps) => {
	return (
		<>
			<h5>Letter Blocks</h5>
			<div className={styles.buttonsContainer}>
				{lettersArr.map((letter, index) => {
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
		</>
	);
};

export default LetterBlocks;
