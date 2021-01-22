import React from 'react';
import hm0 from './img/hm0.png'
import hm1 from './img/hm1.png'
import hm2 from './img/hm2.png'
import hm3 from './img/hm3.png'
import { Button, TextField } from '@material-ui/core';
import { useState } from 'react';
import Axios from 'axios';

import avatar from './img/avatar.jpg'
const Chat = ({chat, started, setStarted, players, yourId, game}) => {

    const [input, setInput] = useState('')

    async function sendReq(str) {
        try {
            let respond = await Axios({
            method: "post",
            url: `http://localhost:3210/game/${game.gameId}/chat`,
            data: { player: yourId, text: str}
          });
        } catch (error) {
          console.error(error);
        }
      }
    
    const mistake = (x) => {
        switch (x) {
            case 0:
                return hm0
            case 1:
                return hm1
            case 2:
                return hm2
            case 3:
                return hm3
            default:
                return hm0
        }
    }

    const chatMargin = (str) => {
        switch (players.length) {
            case 0:
                return {display: str, marginTop: '255px'}
            case 1:
                return {display: str, marginTop: '255px'}
            case 2:
                return {display: str, marginTop: '140px'}
            case 3:
                return {display: str, marginTop: '25px'}
            default:
                return {display: str, marginTop: '255px'}
        }
    } 

    const msgGen = (msg) => {
        if (msg.target === 0) {
            return `*ALL* P${msg.player}: ${msg.text}`
        } else {
            if (msg.target === yourId) {
                return `*PW* P${msg.player}: ${msg.text}`
            } else {
                return `*PW(${msg.target})* P${msg.player}: ${msg.text}`
            }
            
        }
                
            
    }
    
    return (
    <div className='Chat'>
        <div className='zasady' style={ started ? {display: 'none'} : {display: 'block'}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor m veniam, quis nostrud exelnulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <div className='players' style={ started ? {display: 'flex', flexDirection: 'column'} : {display: 'none'}}>
            {players.map(x => <div style={game.curr_move === x.id ? {border: '3px solid red'} : {border: '3px solid black'}} className='player'><div style={x.loser !== true ? {left: '2550px'} : {}} className='Oczy'>X X</div><h1 id='xxx'>{yourId === x.id ? '(YOU)' : ''}</h1><img onClick={() => {console.log(x.mistakes)}} src={avatar} alt='avt' className='avatar' ></img><div className='pinfo'><h2>Player {x.id } </h2></div><img src={mistake(x.mistakes)} alt='blad' className='blad'></img></div>)}
        </div>
        <div style={ started ? chatMargin('flex') : chatMargin('none')} className='Messenger' >
            <div className='msgs'>
                {chat.map(x => <div className='msg' style={ yourId === x.player ? {alignSelf: 'flex-end', backgroundColor: 'darkslategray'} : {} }>{msgGen(x)}</div>)}
            </div>
            <div>
                <input onChange={(e) => { setInput(e.target.value)}} onKeyDown={(e) => {if (e.key === 'Enter') {sendReq(input); e.target.value = ''}}} id="textf" placeholder='Send a message'></input>
                <Button onClick={() => {sendReq(input); document.getElementById('textf').value='';}} variant="contained" color="primary" id="send">SEND</Button>
            </div>
            
        </div>
    </div>
    )
};
 
export default Chat;