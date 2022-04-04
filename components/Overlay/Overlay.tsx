import React from 'react'
import styles from './Overlay.module.scss'

type Message = {
	message: string;
};


const Overlay = ({ message }: Message) => {
  return (
    <div className={styles.overlay}>{message !== '' && <div className={styles.message}>GAME OVER</div>}</div>
  )
}

export default Overlay