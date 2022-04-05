import React, { useState, useEffect } from 'react';
import Awards from '../Awards/Awards';
import styles from './Overlay.module.scss';

interface OverlayProps {
	message: string;
	score: number;
	skips: number;
	handleShowOverlayOnClick: () => void;
}

const Overlay = ({
	message,
	score,
	skips,
	handleShowOverlayOnClick,
}: OverlayProps) => {
	const [awardPos, setAwardPos] = useState('');

	useEffect(() => {
		if (score === 0) setAwardPos('awardBronze');
		else if (score < 2) setAwardPos('awardSilver');
		else setAwardPos('awardGold');
	}, [score]);

	return (
		<div className={styles.overlay} onClick={handleShowOverlayOnClick}>
            {console.log('overlay')};
			{message !== '' && (
				<>
					<div className={styles.messageGameOver}>GAME OVER</div>
					<div
						className={styles.messageScore}
					>{`Score = ${score}`}</div>
					<div
						className={styles.messageSkips}
					>{`Skips = ${skips}`}</div>
				</>
			)}
			<Awards awardPos={awardPos} />
		</div>
	);
};

export default Overlay;
