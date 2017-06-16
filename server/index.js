'use strict';

let homeRes = 0;
let awayRes = 0;
let matchStatus = 'About to start';

const intervalHome = setInterval(() => homeRes += 1, 15000);
const intervalAway = setInterval(() => awayRes += 1, 25000);
setTimeout(() => matchStatus = '1st half', 5000);
setTimeout(() => matchStatus = '2nd half', 50000);
setTimeout(() => {
  matchStatus = 'Finished';
  clearInterval(intervalHome);
  clearInterval(intervalAway);
}, 100000);

/********************************************/
const express = require('express');
const path = require('path');
const logger = require('morgan');
const app = express();

app.use(
  '/',
  express.static(
    path.resolve(__dirname, '../build')
  )
);
/********************************************/

/********************************************/
app.use(logger('dev'));
/********************************************/

/********************************************/
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build/index.html'));
});
/********************************************/

/********************************************/
app.get('/match', (req, res) => {
    res.json({
      date: '2017-06-16',
      teams: {
        home: 'Team1',
        away: 'Team2'
      },
      result: {
        home: homeRes,
        away: awayRes
      },
      status: matchStatus
    });
});
/********************************************/

/********************************************/
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res) => {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        status: err.status,
        error: err
    });
});

/********************************************/
app.listen(3000, () => {
    console.log('Server started.');
});

/********************************************/
