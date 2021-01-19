import napis from './img/hangman.png'
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
  const [yourId, setYourId] = useState(0)
  const [started, setStarted] = useState(false)
  
  useEffect(() => {
    if (appId !== null) {
      client.subscribe(`game${appId}`)
    }
    client.on('message', (topic, message) => {
      let x = JSON.parse(message);
      setCurrGame(x);
      console.log(x.players)
      if (x.started == true) {
        setLobby(false);
        setStarted(true);
      }
    })
  },[appId])



  return (
    <div className="App">
      <div className="Napis">
        <img height='100px' src={napis} alt="Hangman"></img>
      </div>
      <div className="Hm">
        <img height='150px' src={hm} alt="Hm"></img>
      </div>
      <First setAppId={setAppId} setYourId={setYourId} setCurrGame={setCurrGame} currGame={currGame} setLobby={setLobby} lobby={lobby} started={started}/>
      <Lobby game={currGame} setLobby={setLobby} setStarted={setStarted} lobby={lobby}/>
      <Game yourId={yourId} id={currGame.gameId} game={currGame} setStarted={setStarted} setLobby={setLobby} lobby={lobby} started={started}/>
      <Chat game={currGame} yourId={yourId} started={started} setLobby={setLobby} lobby={lobby} players={currGame.players}/>
    </div>
  );
}

export default App;
