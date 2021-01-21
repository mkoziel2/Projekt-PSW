import React from 'react';
import { Button } from '@material-ui/core';
import Axios from 'axios';

const Lobby = ({game, setLobby, setStarted, lobby, yourId}) => {
  function CopyToClipboard (str) {
    let el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert('Copied to clipboard!')
 }

    async function startTheGame(id) {
        try {
            let respond = await Axios({
            method: "get",
            url: `http://localhost:3210/start/${id}`
          });
          
        } catch (error) {
          console.error(error);
        }
      }

    return (
    <div style={ lobby ? {display: 'block'} : {display: 'none'}} className='lobby'>
        <div className='idclick'>Game ID: <div onClick={() => { CopyToClipboard(`${game.gameId}`) }} id='clickerrr'>{game.gameId}</div></div>
        <h1>Ilość graczy: {game.players.length}</h1>
        <Button style={yourId === 1 ? {display: 'inline-block'} : {display: 'none'}} onClick={ () => { startTheGame(game.gameId) } } id='bf' variant="contained" color="primary">
            START THE GAME
        </Button>
    </div>
    )
};
 
export default Lobby;