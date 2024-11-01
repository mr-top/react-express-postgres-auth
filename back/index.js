const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const PostgresSession = require('./lib/pg-session.js');

require('dotenv').config();
const ENV = process.env;

const db = new PostgresSession();

const app = express();

app.use(express.json());
app.use(cors({
  origin: `${ENV.FRONT_ADDR}:${ENV.FRONT_PORT}`,
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(cookieParser());
app.use(session(
  {
    key: 'test-cookie-key',
    secret: 'ultra secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: 60 * 60 * 1 // 1 hour
    }

  }
))
app.use(morgan('common'));

app.get('/', (req, res) => {
  res.send('Hello!!')
});

app.post('/register', async (req, res) => {
  const {username, password} = req.body;

  const result = await db.register(username, password);
  res.json(result);
});

app.post('/login', async (req, res) => {
  const {username, password} = req.body;

  const result = await db.login(username, password, req);
  res.json(result);
});

app.get('/button', async (req, res) => {
  console.log(`${req.session.user} is making a request`);
  res.json({text: `${req.session.user} is making a request`});
});

app.listen(ENV.PORT, () => {
  console.log(`Server is running at ${ENV.PORT}`);
})
