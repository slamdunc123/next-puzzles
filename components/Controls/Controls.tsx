import React from 'react';
import styles from './Controls.module.scss';

interface ControlsProps {
	isTimerOn: boolean;
	handlePlayOnClick: () => void;
	handleSkipOnClick: () => void;
	handleClearOnClick: () => void;
}

const Controls = ({
	isTimerOn,
	handlePlayOnClick,
	handleSkipOnClick,
	handleClearOnClick,
}: ControlsProps) => {
	return (
		<div className={styles.buttonContainer}>
			{!isTimerOn ? (
				<button
					className={styles.button}
					onClick={handlePlayOnClick}
				>
					Play
				</button>
			) : (
				<>
					<button
						className={styles.button}
						onClick={handleSkipOnClick}
					>
						Skip
					</button>
					<button
						className={styles.button}
						onClick={handleClearOnClick}
					>
						Clear
					</button>
				</>
			)}
		</div>
	);
};

export default Controls;
