import React from 'react';
import { TextField, Button } from '@material-ui/core';

const First = () => {
    
    return (
    <div className='first'>
        <Button id='bf' variant="contained" color="primary">
            START NEW GAME
        </Button>
        <h1>
            OR
        </h1>
        <div className='joiner'>
            <TextField id="if" label="Game ID" variant="outlined" />
            <Button id='bf1' variant="contained" color="primary">
                JOIN THE GAME
            </Button>
        </div>
    </div>
    )
};
 
export default First;