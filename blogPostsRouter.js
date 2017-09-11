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

// When create new blog post, make sure required fields are passed.
// Log error and return 400 status with message.
// If correct, add new blog and return it with status of 201
router.post('/', jsonParser, (req, res) => {
  let requiredFields = ['title', 'content', 'author'];
  for (let i = 0; i < requiredFields.length; i++) {
    let field = requiredFields[i];
    if (!(field in req.body)) {
      let message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  let item = BlogPosts.create(req.body.title, req.body.content, 
    req.body.author);
  res.status(201).json(item);
});

// DELETE blog post by id
router.delete('/:id', (req, res) => {
  BlogPosts.delete(req.params.id);
  // Think example and solution have req.params.ID?
  console.log(`Deleted blog post ${req.params.ID}`);
  res.status(204).end();
});


//////////////
module.exports = router;