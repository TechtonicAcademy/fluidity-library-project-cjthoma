const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const { sequelize } = require('./models');

const app = new express();
const PORT = process.env.PORT || 8080;

const corsOptions = {
  origin: 'http://localhost:1234',
};

app.use(logger('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/dist'));
}

app.get('/', (req, res) => {
  res.send('this is the api.');
});

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`API server listening on http://localhost:${PORT}!`);
  });
});
