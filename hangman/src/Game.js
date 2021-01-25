import React from 'react';
import keyboard from './images'
import Axios from 'axios';
import { Button } from '@material-ui/core';
import napis from './img/hangman.png'

const Game = ({setLobby, setYourId, setFinished, started, setStarted, game, id, yourId, finished, setYourChat}) => {
    const word_arr = game.word.split("")
    
    async function choiceRequest(x, p) {
        try {
            await Axios({
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
        <div className="Napis">
          <img height='100px' src={napis} alt="Hangman"></img>
        </div>
        <div className='finisher' style={ finished ? {display: 'flex'} : {display: 'none'}}><h1>{ game.winner === 'none' ? "It's a draw!" : `Player ${game.winner} won!`}</h1><h1>The word was '{game.word}'!</h1><Button onClick={ () => {setStarted(false); setLobby(false); setFinished(false); setYourId(1); setYourChat([])} } id='bf3' variant="contained" color="primary">Back to menu</Button></div>
        <div style={ started ? {display: 'flex'} : {display: 'none'}} className='haslo'>
            {word_arr.map(x => <div style={word_arr.length > 15 ? {width: '35px', height: '35px', fontSize: '30px'} : {width: '50px', height: '50px', fontSize: '40px'}} className={`letter`} >{game.known_letters.includes(x) ? x : ' '}</div>) }
        </div>
        <div className='kb' style={ started && !finished ? {display: 'block'} : {display: 'none'}}>
            {keyboard.map(x => <img style={ game.known_letters.includes(x.letter) ? {filter: 'grayscale(100%)'} : {}} onClick={() => { game.curr_move === yourId && game.players[yourId - 1].mistakes !== 3 ? choiceRequest(x.letter, yourId) : console.log('Nie Twój ruch')}} className='litera' height='80px' src={x.name} alt='litera'></img>)}
        </div>
        <h1 style={ game.curr_move === yourId && started ? {display: 'block'} : {display: 'none'}}>It's your turn!</h1>
        <h1 style={ started ? {display: 'block'} : {display: 'none'}} className='aud'>Audience: {game.audience}</h1>
    </div>
    )
};
 
export default Game;