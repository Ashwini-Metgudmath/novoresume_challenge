'use strict';

const { MongoClient } = require('mongodb');

// Uri for the Docker setup
//const mongoUri = `mongodb://mongodb:27017/novoresume`;
//console.log("entered db connection");
// Uri for the localhost setup
 const mongoUri = `mongodb://localhost:27017/novoresume`;

 //mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false

const mongoClient = new MongoClient(mongoUri, { useUnifiedTopology: true });
mongoClient.connect();
const mongodb = mongoClient.db();

const collection = mongodb.collection('users');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    //assert.equal(err, null);
    //console.log("Found the following records");
    //console.log(docs)
    //callback(docs);
  });
//mongodb.collections('users').then( data => console.log(data));

module.exports = mongodb;
