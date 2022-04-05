import React from 'react';
import {
	BsFillStarFill,
	BsFillEmojiSmileFill,
	BsFillTrophyFill,
} from 'react-icons/bs';
import styles from './Awards.module.scss';

interface AwardsProps {
    awardPos: string
}

const Awards = ({awardPos}: AwardsProps) => {
	return (
		<>
			<BsFillStarFill className={`${styles[awardPos]} ${styles.awardAnimationOne}`} />
			<BsFillTrophyFill className={`${styles[awardPos]} ${styles.awardAnimationTwo}`} />
			<BsFillStarFill className={`${styles[awardPos]} ${styles.awardAnimationThree}`} />
			<BsFillEmojiSmileFill className={`${styles[awardPos]} ${styles.awardAnimationFour}`} />
		</>
	);
};

export default Awards;
