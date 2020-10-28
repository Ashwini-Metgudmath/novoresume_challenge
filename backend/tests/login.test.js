const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const { response } = require("express");

//Assertion style
chai.should();

chai.use(chaiHttp);

const user = {
  email: "ashwini@gmail.com",
  password: "asd",
};

describe("POST /users/login", () => {
  it("Should login valid user and return  token", () => {
    chai
      .request(server)
      .post("/users/login")
      .send({
        email : "ash@gmail.com",
        password : "asd"
      })
      .end((err, response) => {
        response.should.have.status(200);
        response.should.have.a('object');
        response.should.have.property("token");
      });
  });

  it("Should reject invalid user and return  403", () => {
    chai
      .request(server)
      .post("/users/login")
      .send({
          email : "ash@gmail.com",
          password : "asd123"
      })
      .end((err, response) => {
        response.should.have.status(403);
      });
  });
});
