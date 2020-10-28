const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const { response } = require("express");

//Assertion style
chai.should();

chai.use(chaiHttp);

const user = {
  email: "guru@gmail.com",
  password: "asd",
};

describe("POST /users/login", () => {
  it("Should login user and return  token", () => {
    chai
      .request(server)
      .post("/users/login")
      .send(user)
      .end((err, response) => {
        response.should.have.status(200);
      });
  });
});
