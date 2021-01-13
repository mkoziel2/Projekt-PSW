import React from 'react';

const Chat = ({started, setStarted, players}) => {
    
    return (
    <div className='Chat'>
        <div className='zasady' style={ started ? {display: 'none'} : {display: 'block'}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <div classname='players' style={ started ? {display: 'flex', flexDirection: 'column'} : {display: 'none'}}>
            {players.map(x => <div className='player'><div className='avatar'></div><div><h3>Player {x}</h3><h3>Punkty: 0</h3></div></div>)}
        </div>
    </div>
    )
};
 
export default Chat;