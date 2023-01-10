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
    for (const player of req.body.players) {
        const newPlayer = {
            id: players.length + 1,
            name: player.name
        };
        players.push(newPlayer);
    }
    res.send(req.body.players);
});

playerRouter.post('/:playerId', (req, res, next) => {
    if (req.params.playerId <= players.length) {
        res.statusCode = 400;
        return res.send('Invalid player ID');
    }
    const newPlayer = {
        id: +req.params.playerId,
        name: req.body.name
    };
    players.push(newPlayer);
    res.send(newPlayer);
});

playerRouter.put('/', (req, res, next) => {
    for (const player of req.body.players) {
        const existingPlayer = players.find(n => n.id === player.id);
        if (!existingPlayer) {
            res.statusCode = 404;
            return res.send('The player with the given ID was not found.');
        }
    }
    for (const player of req.body.players) {
        const existingPlayer = players.find(n => n.id === player.id);
        existingPlayer.name = player.name;
    }
    res.send(req.body.players);
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

playerRouter.delete('/', (req, res, next) => {
    for (const player of req.body.players) {
        const existingPlayer = players.find(n => n.id === player.id);
        if (!existingPlayer) {
            res.statusCode = 404;
            return res.send('The player with the given ID was not found.');
        }
    }
    for (const player of req.body.players) {
        const existingPlayer = players.find(n => n.id === player.id);
        const index = players.indexOf(existingPlayer);
        players.splice(index, 1);
    }
    res.send(req.body.players);
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
