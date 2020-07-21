const functions = require('firebase-functions');
const express = require('express');
const winston = require('winston');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, '../build')));

app.get('**', (req, res) => {
  res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
  res.status(200).sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(app.get('port'), () => {
  winston.log({ message: `app running on port ${app.get('port')}` });
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest(app);
