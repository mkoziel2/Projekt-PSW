import React from 'react';
import keyboard from './images'

const Game = ({started, setStarted, word}) => {
    const word_arr = word.split("")
    
    return (
    <div className='Gra'>
        <div style={ started ? {display: 'flex'} : {display: 'none'}} className='haslo'>
            {word_arr.map(x => <div style={word_arr.length > 15 ? {width: '35px', height: '35px', fontSize: '30px'} : {width: '50px', height: '50px', fontSize: '40px'}}className='letter' id={`l${x}`}>{' '}</div>) }
        </div>
        <div className='kb' style={ started ? {display: 'block'} : {display: 'none'}}>
            {keyboard.map(x => <img className='litera' height='80px' src={x} alt='litera'></img>)}
        </div>
        <div className='closer' onClick={() => { setStarted(false) }} style={ started ? {display: 'block'} : {display: 'none'}}>
            X
        </div>
    </div>
    )
};
 
export default Game;