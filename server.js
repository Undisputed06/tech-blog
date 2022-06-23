const path = require('path');
const express = require('express');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({})
const session = require('express-session')


const app = express();
const PORT = process.env.Port ||3001;

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(require('./controllers'));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

sequelize.sync({ force: false}).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
  });
