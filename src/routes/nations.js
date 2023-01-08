const express = require('express');
const bodyParser = require('body-parser');

const nationRouter = express.Router();

nationRouter.use(bodyParser.json());

const nations = [
    {
        id: 1,
        name: 'England',
    },
    {
        id: 2,
        name: 'France',
    }
];

nationRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        next();
    })

nationRouter.get('/', (req, res, next) => {
    res.send(nations);
});

nationRouter.get('/:nationId', (req, res, next) => {
    const nation = nations.find(n => n.id === parseInt(req.params.nationId));
    if (!nation) {
        res.statusCode = 404;
        res.send('The nation with the given ID was not found.');
    }
    res.send(nation);
});

nationRouter.post('/', (req, res, next) => {
    const newNations = {
        id: nations.length + 1,
        name: req.body.name
    };
    nations.push(newNations);
    res.send(newNations);
});

nationRouter.post('/:nationId', (req, res, next) => {
    if (req.params.nationId <= nations.length) {
        res.statusCode = 400;
        return res.send('Invalid nation ID');
    }
    const newNations = {
        id: req.params.nationId,
        name: req.body.name
    };
    nations.push(newNations);
    res.send(newNations);
});

nationRouter.put('/:nationId', (req, res, next) => {
    const nation = nations.find(n => n.id === parseInt(req.params.nationId));
    if (!nation) {
        res.statusCode = 404;
        return res.send('The nation with the given ID was not found.');
    }
    nation.name = req.body.name;
    res.send(nation);
});

nationRouter.delete('/:nationId', (req, res, next) => {
    const nation = nations.find(n => n.id === parseInt(req.params.nationId));
    if (!nation) {
        res.statusCode = 404;
        return res.send('The nation with the given ID was not found.');
    }
    const index = nations.indexOf(nation);
    nations.splice(index, 1);
    res.send(nation);
});

module.exports = nationRouter;
