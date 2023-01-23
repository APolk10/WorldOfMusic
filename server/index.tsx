const express = require('express');
require('dotenv').config();

const app = express();

app.get('/', () => {
  console.log('server route reached');
})

app.listen(process.env.PORT);
console.log(`Server listening at http:/localhost:${process.env.PORT}`);
