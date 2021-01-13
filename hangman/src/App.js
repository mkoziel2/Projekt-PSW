import napis from './img/hangman.png'
import hm from './img/hm.png'
import './App.css';
import First from './First'
import Game from './Game'
import Chat from './Chat'
import { useState, useEffect } from 'react'
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:8000/mqtt');

function App() {
  useEffect(() => {
    client.subscribe(`game`);
    client.on('message', function (topic, message) {
      console.log(message.toString());
      console.log('jedna wiadomosc')
    });
  },[])

 
  const [started, setStarted] = useState(false)
  const [players, setPlayers] = useState([1,2,3])
  

  return (
    <div className="App">
      <div className="Napis">
        <img height='100px' src={napis} alt="Hangman"></img>
      </div>
      <div className="Hm">
        <img height='150px' src={hm} alt="Hm"></img>
      </div>
      <First setStarted={setStarted} started={started}/>
      <Game setStarted={setStarted} started={started} word={'meatiness'}/>
      <Chat players={players} setStarted={setStarted} started={started}/>
    </div>
  );
}

export default App;
