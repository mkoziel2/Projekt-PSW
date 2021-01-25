import hm from './img/hm.png'
import './App.css';
import First from './First'
import Game from './Game'
import Chat from './Chat'
import { useState, useEffect } from 'react'
import { default_game } from './test'
import Lobby from './Lobby'
import mqtt from 'mqtt'
const client = mqtt.connect('mqtt://localhost:8000/mqtt')



function App() {

  

  const [lobby, setLobby] = useState(false)
  const [currGame, setCurrGame] = useState({...default_game, players: [{id: 1, mistakes: 0}]})
  const [appId, setAppId] = useState(null)
  const [yourId, setYourId] = useState(1)
  const [started, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)
  const [yourChat, setYourChat] = useState([])
  const [audienceId, setAudienceId] = useState(0)
  
  
  const handleChatChange = (msg) => {
    setYourChat(chat => [...chat, msg])
  }
  
  useEffect(() => {
    
    if (appId !== null) {
      client.subscribe(`game${appId}`)
      client.subscribe(`game${appId}/chat`)
    }
    
    client.on('message', (topic, message) => {
      if (topic === `game${appId}`) {
        let x = JSON.parse(message);
        setCurrGame(x);
        if (x.finished === true) {
          setFinished(true)
        }
        
        if (x.started === true) {
          setLobby(false);
          setStarted(true);
          
        }
      } else if (topic === `game${appId}/chat`) {
          let msg = JSON.parse(message);
          handleChatChange(msg)
        }
      }
      
        
    )
  },[appId])

  


  return (
    <div className="App">
      <div className="Hm">
        <img height='150px' src={hm} alt="Hm"></img>
      </div>
      <First setAudienceId={setAudienceId} setStarted={setStarted} setAppId={setAppId} setYourId={setYourId} setCurrGame={setCurrGame} currGame={currGame} setLobby={setLobby} lobby={lobby} started={started}/>
      <Lobby yourId={yourId} game={currGame} setLobby={setLobby} setStarted={setStarted} lobby={lobby}/>
      <Game setYourChat={setYourChat} setYourId={setYourId} setFinished={setFinished} finished={finished} yourId={yourId} id={currGame.gameId} game={currGame} setStarted={setStarted} setLobby={setLobby} lobby={lobby} started={started}/>
      <Chat audienceId={audienceId} chat={yourChat} game={currGame} yourId={yourId} started={started} setLobby={setLobby} lobby={lobby} players={currGame.players}/>
    </div>
  );
}

export default App;
