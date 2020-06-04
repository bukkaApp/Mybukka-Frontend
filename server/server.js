const express = require('express');
const winston = require('winston');
const path = require('path');
const expressStaticGzip = require('express-static-gzip');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(
  expressStaticGzip(path.join(__dirname, '../build'), {
    enableBrotli: true, // only if you have brotli files too
    orderPreference: ['br', 'gz'],
    setHeaders(res) {
      res.setHeader('Cache-Control', 'public, max-age=31536000');
    }
  }),
);

app.use(express.static(path.join(__dirname, '../build')));

app.get('*', (req, res) => {
  res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
  res.status(200).sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(app.get('port'), () => {
  winston.log({ message: `app running on port ${app.get('port')}` });
});
