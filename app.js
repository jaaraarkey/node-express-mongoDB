'use strict';

const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

let tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// app.get('/', (req, res) => {
//   res.status(200).json({ message: "Hello I'm a server", app: 'natours' });
// });

// app.post('/', (req, res) => {
//   req.status(200).json({ message: 'The posting is working!!!' });
// });

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: { tours },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  //   if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: { tour },
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is up and running on port: ${port}`);
});
