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

});