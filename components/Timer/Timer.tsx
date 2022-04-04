import React, { useState, useEffect } from 'react';
import styles from './Timer.module.scss';

type Secs = {
	secs: number;
};

const Timer = ({ secs }: Secs) => {
	const [secsColor, setSecsColor] = useState('Green');
	useEffect(() => {
		let color;
		if (secs < 21) setSecsColor('Orange');
		if (secs < 11) setSecsColor('Red');
		return () => {
			setSecsColor('Green');
		};
	}, [secs]);

	return <div className={styles[`seconds${secsColor}`]}>{secs}</div>;
};

export default Timer;
