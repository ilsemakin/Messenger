/* Connecting the framework */
const express = require('express');

const app = express(); // Server application

app.get('/user', (req, res) => {
  console.log("Hello");
  res.json();
});

app.listen(3000, (error) => {
  if (error) { throw Error(error); }
  console.log("Server started!");
});