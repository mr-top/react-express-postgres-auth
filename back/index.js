const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const ENV = process.env;

const app = express();

app.use(cors());
app.use(morgan('common'));

app.get('/', (req, res) => {
  res.send('Hello!!')
});

app.listen(ENV.PORT, () => {
  console.log(`Server is running at ${ENV.PORT}`);
})
