const chai = require("chai");
const chaiHttp = require("chai-http");

const should = chai.should();
chai.use(chaiHttp);

const {app, runServer, closeServer} = require("../server.js");

describe("Blog Posts", function () {
  // Call runServer() starts the server, and it also
  // returns a Promise. This prevents the tests from running
  // before the server is started (prevents race conditions).
  before(function () {
    return runServer();
  });

  // Call closeServer() after the tests run, in case other
  // test modules need to call runServer(). If server is already running,
  // runServer() will error out.
  after(function () {
    return closeServer();
  });

  // Test the routes.
  it("should list blog posts on GET", function () {
    return chai.request(app)
      .get("/blog-posts")
      .then(function (res) {
        // console.log(res);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("array");
        res.body.length.should.be.at.above(0);
        res.body.forEach(function (item) {
          item.should.be.a("object");
          item.should.have.all.keys(
            "id", "title", "content", "author", "publishDate");
        });
      });
  });

  it("should create blog post on POST", function () {
    let newPost = {
      title: "The Old Man and the Sea",
      author: "Ernest Hemingway",
      content: "Now is no time to think of what you do not have. Think of what you can do with that there is."
    };

    return chai.request(app)
      .post("/blog-posts")
      .send(newPost)
      .then(function (res) {
        // console.log(res);
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.should.have.all.keys(
          "id", "title", "content", "author", "publishDate");
        res.body.title.should.equal(newPost.title);
        res.body.author.should.equal(newPost.author);
        res.body.content.should.equal(newPost.content);
      });
  });

  it("should update a blog post on PUT", function () {
    let updateData = {
      author: "Dr. Seuss",
      content: "I do not like green eggs and ham. I do not like them, Sam-I-am."
    };

    return chai.request(app)
      // First GET the posts, and get the Id of one of the posts.
      .get("/blog-posts")
      .then(function (res) {
        // console.log(res);
        // Can use Object.assign to replace key/value pairs
        // res.body[0].id contains the Id of the first blog-post
        let updatePost = Object.assign(res.body[0], updateData);
        // console.log(updatePost);
        // Second make PUT request with updated values
        return chai.request(app)
          .put(`/blog-posts/${updatePost.id}`)
          .send(updatePost);
      })
      .then(function (res) {
        // console.log(res);
        res.should.have.status(204);
      });
  });

  it("should delete a blog post on DELETE", function () {
    return chai.request(app)
      // First GET the posts, and get the Id of one of the posts.
      .get("/blog-posts")
      .then(function (res) {
        // console.log(res);
        let postId = res.body[0].id;

        // Second DELETE the post by Id.
        return chai.request(app)
          .delete(`/blog-posts/${postId}`);
      }).then(function (res) {
        // console.log(res);
        res.should.have.status(204);
      });
  });

});