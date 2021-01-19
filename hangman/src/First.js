import React from 'react';
import { TextField, Button } from '@material-ui/core';
import Axios from 'axios';
import { useState } from 'react'

const First = ({setCurrGame, currGame, setLobby, lobby, started, setYourId, setAppId}) => {
    
    const [inputId, setInputId] = useState(0)

    async function startRequest() {
        try {
            let respond = await Axios({
            method: "get",
            url: 'http://localhost:3210/game'
          });
          setCurrGame(respond.data)
          setYourId(1)
          setAppId(respond.data.gameId)
          
        } catch (error) {
          console.error(error);
        }
      }

    async function joinRequest(id) {
    try {
        let respond = await Axios({
        method: "get",
        url: `http://localhost:3210/join/${id}`
        });
        setCurrGame(respond.data)
        setYourId(respond.data.players.length)
        setAppId(respond.data.gameId)
    } catch (error) {
        console.error(error);
    }
    }

    return (
    <div style={ lobby || started ? {display: 'none'} : {display: 'block'}} className='first'>
        <Button onClick={ () => { setLobby(true); startRequest()} } id='bf' variant="contained" color="primary">
            START NEW GAME
        </Button>
        <h1>
            OR
        </h1>
        <div className='joiner'>
            <TextField onChange={(e) => {setInputId(e.target.value)}} id="if" label="Game ID" variant="outlined" />
            <Button onClick={ () => { setLobby(true); joinRequest(inputId)} }id='bf1' variant="contained" color="primary">
                JOIN THE GAME
            </Button>
        </div>
    </div>
    )
};
 
export default First;