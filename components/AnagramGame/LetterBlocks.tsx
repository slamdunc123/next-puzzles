import React from 'react';
import styles from './LetterBlocks.module.scss';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lettersArr = Array.from(alphabet);

const LetterBlocks = ({ ansArr, handleLetterOnClick }) => {
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
