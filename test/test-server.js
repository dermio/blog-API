const chai = require("chai");
const chaiHttp = require("chai-http");

const should = chai.should();
chai.use(chaiHttp);

const {app, runServer, closeServer} = require("../server.js");