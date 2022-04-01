import React from 'react'
import styles from './AnagramBlocks.module.scss'



const AnagramBlocks = ({anagramArr, selectedLetter}) => {

    const correctLetter = anagramArr.includes(selectedLetter)
  return (
  <>
    <h5>Anagram Blocks</h5>
    <div className={styles.answerContainer}>

    {anagramArr.map((letter, index) => {
        return (<div className={styles.answerLetter} key={index}>{letter}</div>)
    })}
    </div>
  </>
  )
}

export default AnagramBlocks