'use strict';

const mongodb = require('../database/mongodb');
const ObjectId = require('mongodb').ObjectID;
const { generateAccessToken } = require('../middleware');
const bcrypt = require('bcrypt');



module.exports = {
    async getAllUsers () {
        try {
            console.log("entred inside operations")
            const users = await mongodb.collection('users').find({}).toArray();
            users.map(user => { user.id = user._id; delete user._id }); // We don't wanna expose which database we use to the view by the way id is stored
            return users;
        } catch (error) {
            return error;
        }
    },

    async register (userData) {
        try {
            const user = (await mongodb.collection('users').find({ "email": userData.email }).toArray())[0];

            if (user) return 409;
            //console.log("entered register");
            bcrypt.hash(userData.password, 10).then(async hash => {
                delete userData.password;
                userData.password = hash;
                await mongodb.collection('users').insertOne(userData);
            });
        } catch (error) {
            return error;
        }
    },

    async login (userData) {
        try {
            // Hint: See register() function
            // Hint: Call generateAccessToken() here
           
                const user = (await mongodb.collection('users').find({ "email": userData.email}).toArray())[0];
                if (user) {
                    const isValidPassword = bcrypt.compare(userData.password, user.password);
                    if(isValidPassword){
                            const token = generateAccessToken(user._id);
                            //console.log("token in operations: "+ token)
                            return { token: token,
                                user : {
                                    id : user._id
                                } };
                        }
                        else
                        return 403;
                }
               
                else
                return 409;
 
        } catch (error) {
            return error;
        }
    },

    async getOffer (userId) {
        try {
            const user = await mongodb.collection('users').find({ "_id": ObjectId(userId) }).project({ _id: 0, products: 1, billingInfo: 1 }).toArray();
            return user;
        } catch (error) {
            return error;
        }
    },

    async saveProducts (userData) {
        try {
            await mongodb.collection('users').findOneAndUpdate({ "_id": ObjectId(userData.id) }, { $set: { products: userData.products } }, { upsert: true });
        } catch (error) {
            return error;
        }
    },

    async saveBillingInfo (userData) {
        try {
            await mongodb.collection('users').findOneAndUpdate({ "_id": ObjectId(userData.id) }, { $set: { billingInfo: userData.billingInfo } }, { upsert: true });
        } catch (error) {
            return error;
        }
    }
}