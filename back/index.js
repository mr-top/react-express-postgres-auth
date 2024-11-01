const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const PostgresSession = require('./lib/pg-session.js');
require('dotenv').config();
const ENV = process.env;

const app = express();

app.use(cors({
  origin: `http://localhost:5173`,
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(morgan('common'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello!!')
});

app.post('/register', async (req, res) => {
  const {username, password} = req.body;

  const db = new PostgresSession();
  await db.register(username, password);
});

app.listen(ENV.PORT, () => {
  console.log(`Server is running at ${ENV.PORT}`);
})
