import React from 'react';
import hm0 from './img/hm0.png'
import hm1 from './img/hm1.png'
import hm2 from './img/hm2.png'
import hm3 from './img/hm3.png'

import avatar from './img/avatar.jpg'
const Chat = ({started, setStarted, players, yourId, game}) => {

    
    
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

    
    return (
    <div className='Chat'>
        <div className='zasady' style={ started ? {display: 'none'} : {display: 'block'}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor m veniam, quis nostrud exelnulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <div className='players' style={ started ? {display: 'flex', flexDirection: 'column'} : {display: 'none'}}>
            {players.map(x => <div style={game.curr_move === x.id ? {border: '3px solid red'} : {border: '3px solid black'}} className='player'><div style={x.loser !== true ? {left: '2550px'} : {}} className='Oczy'>X X</div><h1 id='xxx'>{yourId === x.id ? '(YOU)' : ''}</h1><img onClick={() => {console.log(x.mistakes)}} src={avatar} alt='avt' className='avatar' ></img><div className='pinfo'><h2>Player {x.id } </h2></div><img src={mistake(x.mistakes)} alt='blad' className='blad'></img></div>)}
        </div>
    </div>
    )
};
 
export default Chat;