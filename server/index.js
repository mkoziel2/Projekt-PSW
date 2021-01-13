const express = require('express');
const mqtt = require('mqtt');
cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

app.listen(3210, () => {
    console.log('App listening on port 3210');
});

const client = mqtt.connect('mqtt://localhost:1883');

default_game = {
    known_letters: [],
    finished: false,
    players: [],
    started: true
};

const idAndWord = () => {
    let id = Math.random().toString(36).substr(2, 9);

    let lines = [];
    require('fs').readFileSync('words.txt', 'utf-8').split(/\r?\n/).forEach(function(line) {
        lines.push(line);
    });
    let word = lines[Math.random() * 99]
    return {id: id, word: word}
}



games = [];

app.get('/', (req, res) => {
    let obj = idAndWord()
    games = [...games, {...default_game, gameId: obj.id, word: obj.word}]
    res.send('elo')
})

