import React from 'react';
import keyboard from './images'
import Axios from 'axios';

const Game = ({started, setStarted, game, id, yourId}) => {
    const word_arr = game.word.split("")
    
    async function choiceRequest(x, p) {
        try {
            let respond = await Axios({
            method: "post",
            url: `http://localhost:3210/game/${id}/choice`,
            data: { letter: x, player: p }
          });
        } catch (error) {
          console.error(error);
        }
      }
    
    return (
    <div className='Gra'>
        <div style={ started ? {display: 'flex'} : {display: 'none'}} className='haslo'>
            {word_arr.map(x => <div style={word_arr.length > 15 ? {width: '35px', height: '35px', fontSize: '30px'} : {width: '50px', height: '50px', fontSize: '40px'}} className={`letter`} >{game.known_letters.includes(x) ? x : ' '}</div>) }
        </div>
        <div className='kb' style={ started ? {display: 'block'} : {display: 'none'}}>
            {keyboard.map(x => <img style={ game.known_letters.includes(x.letter) ? {filter: 'grayscale(100%)'} : {}} onClick={() => { game.curr_move === yourId ? choiceRequest(x.letter, yourId) : console.log('Nie Twój ruch')}} className='litera' height='80px' src={x.name} alt='litera'></img>)}
        </div>
        <div className='closer' onClick={() => { setStarted(false) }} style={ started ? {display: 'block'} : {display: 'none'}}>
            X
        </div>
    </div>
    )
};
 
export default Game;