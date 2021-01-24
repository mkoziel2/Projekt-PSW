import React from 'react';
import hm0 from './img/hm0.png'
import hm1 from './img/hm1.png'
import hm2 from './img/hm2.png'
import hm3 from './img/hm3.png'
import resB from './img/res.jpg'
import { Button } from '@material-ui/core';
import { useState } from 'react';
import Axios from 'axios';

import avatar from './img/avatar.jpg'
const Chat = ({audienceId, chat, started, setStarted, players, yourId, game}) => {

    const [input, setInput] = useState('')

    async function sendReq(str) {
        let pid = yourId;
        let isAud = false;
        if (yourId === -1) {
            pid = audienceId;
            isAud = true;
        }
        try {
            await Axios({
            method: "post",
            url: `http://localhost:3210/game/${game.gameId}/chat`,
            data: { player: pid, text: str, audience: isAud}
          });
        } catch (error) {
          console.error(error);
        }
      }

    async function resReq(id) {
    try {
        await Axios({
        method: "post",
        url: `http://localhost:3210/game/${game.gameId}/changeMove`,
        data: {player: id}
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
            if (msg.isAud) {
                return `*ALL* A${msg.player}: ${msg.text}`
            } else {
                return `*ALL* P${msg.player}: ${msg.text}`
            }
            
        } else {
            if (msg.target === yourId) {
                return `*PW* P${msg.player}: ${msg.text}`
            } else {
                return `*PW(${msg.target})* P${msg.player}: ${msg.text}`
            }
            
        }
    }

    const visibleMsg = () => {
        let tmp = [];
        chat.forEach(x => {
            if (audienceId !== 0 && x.target === 0) {
                tmp = [...tmp, x]
            } else {
                if ( x.target === 0 || x.target === yourId || x.player === yourId) {
                    tmp = [...tmp, x]
                }
            }
        })
        return tmp.slice(-5);
    }
    
    return (
    <div className='Chat'>
        <div className='zasady' style={ started ? {display: 'none'} : {display: 'flex'}}>
             <h1 className='hzas' style={{fontWeight: 'bold'}}>ZASADY GRY</h1>
             <div className='tekst'>Welcome to Hangman! You have to guess which word is hidden behind the white tiles. You start your turn choosing which letter you want to guess. If you're right you have one more chance and so on. Otherwise your amount of mistakes increace. You have 3 mistakes until you die. You can ask your playmates, if you can change your turn (every player has to type <b>/yes</b> on the chat to actually change it). If you want to type a private message you can type <b>/pw #playernumberhere#</b> and then your message. The winner is the one who guesses the last letter. </div>
        </div>
        <div className='players' style={ started ? {display: 'flex', flexDirection: 'column'} : {display: 'none'}}>
            {players.map(x => <div style={game.curr_move === x.id ? {border: '3px solid red'} : {border: '3px solid black'}} className='player'><div style={x.mistakes !== 3 ? {left: '2550px'} : {}} className='Oczy'>X X</div><img onClick={() => { resReq(x.id)}} src={resB} alt='resB' className='resButton' style={ game.lastMove.player === yourId && game.lastMove.isGood === false && x.id === yourId && game.votes.every(x => x === false) ? {display: 'inline'} : {display: 'none'}}></img><h1 id='xxx'>{yourId === x.id ? '(YOU)' : ''}</h1><img onClick={() => {console.log(x.mistakes)}} src={avatar} alt='avt' className='avatar' ></img><div className='pinfo'><h2>Player {x.id } </h2></div><img src={mistake(x.mistakes)} alt='blad' className='blad'></img></div>)}
        </div>
        <div style={ started ? chatMargin('flex') : chatMargin('none')} className='Messenger' >
            <div className='msgs'>
                {visibleMsg().map(x => <div className='msg' style={ (yourId === x.player && x.isAud === false) || (x.isAud === true && audienceId === x.player) ? {alignSelf: 'flex-end', backgroundColor: 'darkslategray'} : {} }>{msgGen(x)}</div>)}
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