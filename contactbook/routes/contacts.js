var express = require('express');
var router = express.Router();
var db = require('./database');
var process = require('./mailer');
var { ObjectID } = require('mongodb');

// ***********************redirect to login if not logged in********************************
router.use((req, res, next)=> {
    if (req.session.user) {
        next();
    }
    else {
        res.redirect("/login");
    }
});

/**
 * Display(): reads the contact list from database to render on contacts page
 */
const Display = async (req, res, next) => {
    var results = await db.Read();
    res.render('contacts', { contacts: results});
}

/**
 * PostContact(): posts any new/updated contacts to the database
 */
const PostContact = async (req, res, next) => {
    var contact = req.body.contact;
    contact._id = ObjectID(contact._id);
    // console.log(contact);
    // console.log("received above, exisiting match below");
    var match = await db.GetContact(contact._id);
    // console.log(match);

    // if match is found, update; else, add
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

/**
 * DeleteContact(): calls delete to delete from database
 */
const DeleteContact = async (req, res, next) => {
    const contactId = ObjectID(req.body.contactId);
    await db.Delete(contactId);
    console.log("returned");
    res.end();
}


// ***********************requests to /contacts********************************
router.get("/", Display);
router.post("/", PostContact);
router.post("/:id/delete", DeleteContact);

module.exports = router;