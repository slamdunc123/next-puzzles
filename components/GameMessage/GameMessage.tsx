import React from 'react';
import styles from './GameMessage.module.scss';

type Message = {
	message: string;
};

const GameMessage = ({ message }: Message) => {
	return <>{message !== '' && <div className={styles.message}>GAME OVER</div>}</>;
};

export default GameMessage;
