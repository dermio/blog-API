const express = require('express');
const morgan = require('morgan');

const app = express();

// use Express router, modularize route to /blog-posts
// import blog-posts
const blogPostsRouter = require('./blogPostsRouter');

// log http layer, copied from example shopping-list-v5
app.use(morgan('common'));


/*
I don't have any static files
app.use(express.static('public'));

I don't have an index.html file
app.get('/', (req, res) => {

});
*/


// Use app.use to route requests to /blog-posts.
// when requests come into `/blog-posts`,
// we'll route them to the express
// router instances we've imported. Remember,
// these router instances act as modular, mini-express apps.
app.use('/blog-posts', blogPostsRouter);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});