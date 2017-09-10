const express = require('express');
// create new Express router instance
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

// create some blog posts
BlogPosts.create('Hello', 'Greetings from Earth', 'Davy', 'right now');
BlogPosts.create('cake', 'I want cake', 'doggy');


// send back JSON of blog posts on GET requests to root
router.get('/', (req, res) => {
  res.json(BlogPosts.get());
});

//
module.exports = router;