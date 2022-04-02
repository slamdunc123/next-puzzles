import React, { MouseEvent } from 'react';
import styles from './AnswerBlocks.module.scss';

interface AnswerBlocksProps {
	activeBlock: number;
	blockArr: string[];
	handleBlockOnClick: (e: MouseEvent<HTMLDivElement>) => void;
}

const AnswerBlocks = ({
	activeBlock,
	blockArr,
	handleBlockOnClick,
}: AnswerBlocksProps) => {
	return (
		<>
			<h5>Answer Blocks</h5>
			<div className={styles.blockContainer}>
				{blockArr.map((block, index) => {
					return (
						<div
							id={index}
							onClick={handleBlockOnClick}
							key={index}
							className={
								activeBlock == index
									? styles.activeBlock
									: styles.block
							}
						>
							{block}
						</div>
					);
				})}
			</div>
		</>
	);
};

export default AnswerBlocks;
