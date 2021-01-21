
const { Console } = require('console');
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


const idAndWord = () => {
    let id = Math.random().toString(36).substr(2, 9);

    let lines = [];
    require('fs').readFileSync('../hangman/src/words.txt', 'utf-8').split(/\r?\n/).forEach(function(line) {
        lines.push(line);
    });
    let word = lines[Math.round(Math.random() * 99)]
    return {id: id, word: word}
}



games = [];

app.get('/game', (req, res) => {
    console.log('Stworzenie nowej gry')
    let obj = idAndWord()
    let game = {known_letters: [], curr_move: 1, started: false, players: [{id: 1, mistakes: 0, loser: false}], gameId: obj.id, word: obj.word, finished: false, winner: 'none'}
    let str = JSON.stringify(game)
    games = [...games, game]
    console.log(game)
    res.send(game)
})


app.get('/join/:id', (req, res) => {
    console.log('Dolaczenie do istniejacej gry')
    let g = 'x';
    games = games.reduce((a,b) => {
        if (b.gameId === req.params.id) {
            b.players = [...b.players, {id: b.players.length + 1, mistakes: 0, loser: false}];
            g = b;
        }
        return [...a, b]
    },[])
    client.publish(`game${g.gameId}`, JSON.stringify(g))
    res.send(g)
})

app.get('/start/:id', (req, res) => {
    console.log(games)
    console.log('started', req.params.id)
    let g;
    games = games.reduce((a,b) => {
        if (b.gameId === req.params.id) {
            b.started = true
            g = b;
        }
        return [...a, b]
    },[])
    console.log(g.started)
    client.publish(`game${g.gameId}`, JSON.stringify(g))
    res.send(g)
})

app.post('/game/:id/choice', (req, res) => {
    let g;
    let isGood;
    let word_arr;
    games = games.reduce((a,b) => {
        if (b.gameId === req.params.id) {
            word_arr = [...new Set(b.word)]
            if (b.word.includes(req.body.letter)) {
                if (!b.known_letters.includes(req.body.letter)) {
                    b.known_letters = [...b.known_letters, req.body.letter];
                }
                isGood = true;

                if (b.known_letters.length === word_arr.length) {
                    b.finished = true;
                    b.winner = req.body.player;
                }

            } else {
                b.players[req.body.player - 1].mistakes += 1
                isGood = false
                if (b.players[req.body.player - 1].mistakes === 3) {
                    b.players[req.body.player - 1].loser = true;
                }
            }
            if (!isGood) {
                let ifLost = b.players.filter(x => x.mistakes === 3)

                if (ifLost.length === b.players.length) {
                    b.finished = true;
                }
                
                if (b.curr_move === b.players.length) {
                    b.curr_move = 1
                } else {
                    b.curr_move += 1
                }
            }
            
            g = b;
        }
        return [...a, b]
    },[])
    console.log('choice', req.body.letter, 'in', g.word)
    console.log(g)
    client.publish(`game${g.gameId}`, JSON.stringify(g))
    res.send(g)
})

