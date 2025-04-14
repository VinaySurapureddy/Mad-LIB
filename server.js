const express = require('express');
const logger = require('morgan');
const path = require('path');

const server = express();
server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Route: /do_a_random
server.get(['/do_a_random', '/do_a_random/'], (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`);
});

// POST: /submit (Mad Lib)
server.post('/submit', (req, res) => {
  const { noun, verb, adjective, adverb, place } = req.body;

  if (!noun || !verb || !adjective || !adverb || !place) {
    return res.send(`
      <h1>Submission Failed</h1>
      <p>Please fill out <strong>all</strong> fields.</p>
      <a href="/ITC505/lab-7/index.html">Go Back</a>
    `);
  }

  const madLib = `One day, a ${adjective} ${noun} decided to ${verb} ${adverb} through the streets of ${place}.`;

  res.send(`
    <h1>Your Mad Lib Story</h1>
    <p>${madLib}</p>
    <a href="/ITC505/lab-7/index.html">Play Again</a>
  `);
});

// Static files from /public
const publicDir = path.join(__dirname, 'public');
server.use(express.static(publicDir));

// Port config
let port = 80;
if (process.argv[2] === 'local') {
  port = 8080;
}
server.listen(port, () => console.log(`Server running on http://localhost:${port}`));
