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
  const [yourId, setYourId] = useState(1)
  const [started, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)
  const [yourChat, setYourChat] = useState([])
  
  
  
  useEffect(() => {
    if (appId !== null) {
      client.subscribe(`game${appId}`)
      client.subscribe(`game${appId}/chat`)
    }
    client.on('message', (topic, message) => {
      console.log(JSON.parse(message))
      
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
      } else {
        if (topic === `game${appId}/chat`) {
          let msg = JSON.parse(message);
          handleChatChange(msg)
        }
      }
      
        
    })
  },[appId])

  const handleChatChange = (msg) => {
    console.log(msg, yourId)
    let chat = yourChat.slice(-4);
    

    
    if (msg.target === 0 || msg.target === yourId || msg.player === yourId) {
      setYourChat(chat => [...chat, msg].slice(-5))
      console.log(yourChat)
    }
    
  }



  return (
    <div className="App">
      <div className="Napis">
        <img height='100px' src={napis} alt="Hangman"></img>
      </div>
      <div className="Hm">
        <img height='150px' src={hm} alt="Hm"></img>
      </div>
      <First setStarted={setStarted} setAppId={setAppId} setYourId={setYourId} setCurrGame={setCurrGame} currGame={currGame} setLobby={setLobby} lobby={lobby} started={started}/>
      <Lobby yourId={yourId} game={currGame} setLobby={setLobby} setStarted={setStarted} lobby={lobby}/>
      <Game setYourChat={setYourChat} setYourId={setYourId} setFinished={setFinished} finished={finished} yourId={yourId} id={currGame.gameId} game={currGame} setStarted={setStarted} setLobby={setLobby} lobby={lobby} started={started}/>
      <Chat chat={yourChat} game={currGame} yourId={yourId} started={started} setLobby={setLobby} lobby={lobby} players={currGame.players}/>
    </div>
  );
}

export default App;
