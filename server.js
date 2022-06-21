const path = require('path');
const express = require('express');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.Port ||3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(require('./controllers'));
app.use(express.static(path.join(__dirname, 'public')));

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
  });