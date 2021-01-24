
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
    let obj = idAndWord()
    let game = {audience: 0, votes: [false], lastMove: {isGood: true, player: 0}, known_letters: [], curr_move: 1, started: false, players: [{id: 1, mistakes: 0, loser: false}], gameId: obj.id, word: obj.word, finished: false, winner: 'none'}
    let str = JSON.stringify(game)
    games = [...games, game]
    console.log(game)
    res.send(game)
})


app.get('/join/:id', (req, res) => {
    let g = 'x';
    let full = false;
    games = games.reduce((a,b) => {
        if (b.gameId === req.params.id) {
            if (b.started === true) {
                b.audience += 1
            }
            if (b.players.length !== 3 && b.started !== true) {
                b.players = [...b.players, {id: b.players.length + 1, mistakes: 0, loser: false}];
                b.votes = [...b.votes, false]
            } else {
                full = true
            }
            g = b;
        }
        return [...a, b]
    },[])
    if (!full || g.audience > 0) {
        client.publish(`game${g.gameId}`, JSON.stringify(g))
        res.send(g)
    } else {
        res.send('x')
    }
    
    
    
})

app.get('/start/:id', (req, res) => {
    let g;
    games = games.reduce((a,b) => {
        if (b.gameId === req.params.id) {
            b.started = true
            g = b;
        }
        return [...a, b]
    },[])
    client.publish(`game${g.gameId}`, JSON.stringify(g))
    res.send(g)
})

app.post('/game/:id/choice', (req, res) => {
    let g;
    let isGood;
    let word_arr;
    games = games.reduce((a,b) => {
        if (b.gameId === req.params.id) {
            b.lastMove.player = req.body.player;
            word_arr = [...new Set(b.word)];
            b.votes = b.players.map(x => false)
            if (b.word.includes(req.body.letter)) {
                if (!b.known_letters.includes(req.body.letter)) {
                    b.known_letters = [...b.known_letters, req.body.letter];
                }
                isGood = true;
                b.lastMove.isGood = true

                if (b.known_letters.length === word_arr.length) {
                    b.finished = true;
                    b.winner = req.body.player;
                }

            } else {
                b.players[req.body.player - 1].mistakes += 1
                isGood = false
                b.lastMove.isGood = false
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
    console.log(g)
    client.publish(`game${g.gameId}`, JSON.stringify(g))
    res.send(g)
})

app.post('/game/:id/chat', (req, res) => {
    if (req.body.text.startsWith('/yes') && req.body.audience === false) {
        games = games.reduce((a,b) => {
            if (b.gameId === req.params.id) {
                b.votes[req.body.player - 1] = true
                if (b.votes.every(x => x === true)) {
                    b.votes.forEach(x => x = false)
                    b.players[b.lastMove.player - 1].mistakes -= 1
                    if (b.curr_move === 1) {
                        b.curr_move = b.players.length
                    } else {
                        b.curr_move -= 1
                    }
                    b.lastMove = {player: 0, isGood: true}
                    client.publish(`game${b.gameId}`, JSON.stringify(b))
                }
            }
            return [...a, b]
        },[])
    } else {
        console.log(req.body.text)
        let priv = false;
        let target = 0
        if (req.body.text.startsWith('/pw') && req.body.audience === false) {
            priv = true;
            target = Number(req.body.text[4])
        }
        let game = games.find(x => x.gameId === req.params.id)
        let pls = [0];
        game.players.forEach(x => pls = [...pls, x.id])
        
        let player = req.body.player
        if (target !== player && pls.includes(target) ) {
            
            if (priv) {
                client.publish(`game${req.params.id}/chat`, JSON.stringify({target: target, player: player, text: req.body.text.slice(6,31), isAud: req.body.audience}))
            } else {
                client.publish(`game${req.params.id}/chat`, JSON.stringify({target: target, player: player, text: req.body.text.slice(0,25), isAud: req.body.audience}))
            }
        }
    }
    res.send('x')
    
})

app.post('/game/:id/changeMove', (req, res) => {
    games = games.reduce((a,b) => {
        if (b.gameId === req.params.id) {
            b.votes[req.body.player - 1] = true
            client.publish(`game${req.params.id}/chat`, JSON.stringify({target: 0, player: req.body.player, text: 'Chcę zmienić ruch!'}))
            client.publish(`game${b.gameId}`, JSON.stringify(b))
        }
        return [...a, b]
    },[])
})
