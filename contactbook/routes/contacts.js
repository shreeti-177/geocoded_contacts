var express = require('express');
const { ObjectID } = require('mongodb');
var router = express.Router();
var db = require('./database');
var process = require('./mailer');

const Display = async (req, res, next) => {
    var results = await db.Read();
    res.render('contacts', { contacts: results});
}

const PostContact = async (req, res, next) => {
    var contact = req.body.contact;
    contact._id = ObjectID(contact._id);
    // console.log(contact);
    // console.log("received above, exisiting match below");
    var match = await db.GetContact(contact._id);
    // console.log(match);
    if (match.length > 0) {
        await db.Update(contact);
    }
    else {
        const address = contact.street + ", " + contact.city + ", " + contact.state + ", " + contact.zip;
        const location = await req.geocoder.geocode(address);
        if (location[0] === undefined) {
            console.error("Address location not found. Co-ordinates set to default: null.");
        }
        else {
            const latitude = location[0].latitude;
            const longitude = location[0].longitude;
            contact.latitude = latitude;
            contact.longitude = longitude;
        }
        await db.Add(contact);
    }
    var results = await db.Read();
    res.end(JSON.stringify({ newList: results }));
}

const DeleteContact = async (req, res, next) => {
    const contactId = ObjectID(req.body.contactId);
    await db.Delete(contactId);
    console.log("returned");
    res.end();
}

  

router.get("/", Display);
router.post("/", PostContact);
router.post("/:id/delete", DeleteContact);

module.exports = router;