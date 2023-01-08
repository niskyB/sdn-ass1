const express = require('express');
const bodyParser = require('body-parser');

const playerRouter = express.Router();

playerRouter.use(bodyParser.json());

const players = [
    {
        id: 1,
        name: 'Player 1',
    },
    {
        id: 2,
        name: 'Player 2',
    }
];

playerRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        next();
    });

playerRouter.get('/', (req, res, next) => {
    res.send(players);
});

playerRouter.get('/:playerId', (req, res, next) => {
    const player = players.find(n => n.id === parseInt(req.params.playerId));
    if (!player) {
        res.statusCode = 404;
        return res.send('The player with the given ID was not found.');
    }
    res.send(player);
});

playerRouter.post('/', (req, res, next) => {
    const newPlayer = {
        id: players.length + 1,
        name: req.body.name
    };
    players.push(newPlayer);
    res.send(newPlayer);
});

playerRouter.post('/:playerId', (req, res, next) => {
    if (req.params.playerId <= players.length) {
        res.statusCode = 400;
        return res.send('Invalid player ID');
    }
    const newPlayer = {
        id: req.params.playerId,
        name: req.body.name
    };
    players.push(newPlayer);
    res.send(newPlayer);
});

playerRouter.put('/:playerId', (req, res, next) => {
    const player = players.find(n => n.id === parseInt(req.params.playerId));
    if (!player) {
        res.statusCode = 404;
        return res.send('The player with the given ID was not found.');
    }
    player.name = req.body.name;
    res.send(player);
});

playerRouter.delete('/:playerId', (req, res, next) => {
    const player = players.find(n => n.id === parseInt(req.params.playerId));
    if (!player) {
        res.statusCode = 404;
        return res.send('The player with the given ID was not found.');
    }
    const index = players.indexOf(player);
    players.splice(index, 1);
    res.send(player);
});

module.exports = playerRouter;
