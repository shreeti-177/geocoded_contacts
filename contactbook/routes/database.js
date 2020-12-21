var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

// ***********************attributes for database connection********************************
const url = 'mongodb://localhost:27017/';
var dbName = 'contactbook';
var collectionName = 'contacts';
var contacts;

// ***********************establish connection to database********************************
/**
 * SetConnection(): starts up the connection
 */
const SetConnection = async () => {
    const connection = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    const db = connection.db(dbName);
    contacts = db.collection(collectionName);
};

/**
 * Add(contact): adds a new contact entry to the database 
 */
const Add = async (contact) => {
    // console.log(contacts);
    await contacts.insertOne(contact, (err, document) => {
        if (err) res.sendStatus(500);
        const info = document.ops[0];
        // console.log(info);
    });
};

/**
 * Read(): reads all the contacts from the database for display
 */
const Read = async () => {   
    try {
        const result = await contacts.find().toArray();
        return result;
    }
    catch (error) {
        console.error(error.message);
        return res.render('error');
    }
}

/**
 * GetContact(contactId): accesses a single contact from the database based on contactId
 */
const GetContact = async function (contactId) {
    try {
        var result = await contacts.find({ "_id": ObjectID(contactId) }).toArray();
        return result;
    }
    catch (error) {
        console.log(error.message);
        return res.render('error');
    }
}

/**
 * Update(contact): updates the contact that matches the id of the contact passed
 */
const Update = async (contact) => {
    try {
        await contacts.replaceOne({ _id: ObjectID(contact._id) }, contact,{upsert:true});
    }
    catch (error) {
        console.log(error.message);
        res.render('error');
    }
}

/**
 * Delete(contactId): deletes the contact that matches the id of the contact passed
 */
const Delete = async (contactId) => {
    try {
        await contacts.deleteOne({ _id: ObjectID(contactId) });
        return;
    }
    catch (error) {
        console.log(error.message);
        res.render('error');
    }
}

// ***********************export modules for use********************************
module.exports = {
    SetConnection: SetConnection,
    Add: Add,
    Read: Read,
    GetContact: GetContact,
    Update: Update,
    Delete: Delete
};