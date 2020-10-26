"use strict";

const users = require("express").Router();
const operations = require("../operations/users");
const pdfTemplate = require("../documents/pdfTemplate");
const { authenticateToken } = require("../middleware");
const wkhtmltopdf = require('wkhtmltopdf');
const jwt = require("jsonwebtoken");
const fs = require("fs");
const pdf = require('html-pdf');

const { dirname } = require("path");


users.get("/user", async (req, res, next) => {
  try {
    console.log("entred route useres api");
    const users = await operations.getAllUsers();
    if (users instanceof Error) throw users;
    res.send(users);
  } catch (error) {
    res.send(500);
  }
});

users.post("/register", async (req, res, next) => {
  try {
    //console.log("req" + req.body);
    const result = await operations.register(req.body);
    if (result === 409) return res.sendStatus(409);
    if (result instanceof Error) throw result;
    res.send(result);
  } catch (error) {
    res.sendStatus(500);
  }
});

users.post("/login", async (req, res, next) => {
  try {
    //console.log(req.body);
    const result = await operations.login(req.body);
    if (result instanceof Error) throw result;
    res.send(result);
  } catch (error) {
    res.sendStatus(500);
  }
});

users.post("/logout", authenticateToken, async (req, res, next) => {
  try {
    const decoded = jwt.verify(req.token, process.env.TOKEN_SECRET);
    if (decoded.id === req.body.id) {
      const result = await operations.logout(req.body);
      if (result instanceof Error) throw result;
      res.send(result);
    } else res.sendStatus(403);
  } catch (error) {
    res.sendStatus(500);
  }
});

users.post("/:id/products", authenticateToken, async (req, res, next) => {
  try {
    req.body.id = req.params.id;
    const decoded = jwt.verify(req.token, process.env.TOKEN_SECRET);
    if (decoded.id === req.params.id) {
      const result = await operations.saveProducts(req.body);
      if (result instanceof Error) throw result;
      res.send(result);
    } else res.sendStatus(403);
  } catch (error) {
    res.sendStatus(500);
  }
});

users.post("/:id/billing-info", authenticateToken, async (req, res, next) => {
  try {
    req.body.id = req.params.id;
    const decoded = jwt.verify(req.token, process.env.TOKEN_SECRET);
    if (decoded.id === req.params.id) {
      const result = await operations.saveBillingInfo(req.body);
      if (result instanceof Error) throw result;
      res.send(result);
    } else res.sendStatus(403);
  } catch (error) {
    res.sendStatus(500);
  }
});

users.get("/:id/offer", authenticateToken, async (req, res, next) => {
  try {
    const decoded = jwt.verify(req.token, process.env.TOKEN_SECRET);
    if (decoded.id === req.params.id) {
      const offer = await operations.getOffer(req.params.id);
      if (offer instanceof Error) throw offer;
      res.send(offer);
    } else res.sendStatus(403);
  } catch (error) {
    res.sendStatus(500);
  }
});

users.post("/:id/offer", authenticateToken, async (req, res, next) => {
  try {
    const {firstName, lastName, address, postalCode, phoneNr, email} = req.body.billingInfo
    const products = req.body.products;
    console.log("product:"+products[0].title);
    const decoded = jwt.verify(req.token, process.env.TOKEN_SECRET);
    console.log("decoded id:"+decoded.id);
    if (decoded.id === req.params.id) {
     
      //console.log(pdfTemplate(firstName, lastName, address, postalCode, email, phoneNr, products));
      pdf.create(pdfTemplate(firstName, lastName, address, postalCode, email, phoneNr, products), {}).toFile('./documents/result.pdf', (err) =>{
        if(err){
          res.send(Promise.reject())
        }
        res.send(Promise.resolve())
      })
      
    } else res.sendStatus(403);
  } catch (error) {
    res.sendStatus(500);
  }
});

users.get('/fetch-pdf', (req, res) =>{
  const path = process.cwd();
  console.log(path);
  res.sendFile(`${path}/documents/result.pdf`);
})

module.exports = users;
