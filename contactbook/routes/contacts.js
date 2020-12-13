var express = require('express');
var router = express.Router();
module.exports = router;

const display = async (req, res, next) => {
    const result = await req.contacts.find().toArray(function (err, contacts) {
        if (err) {
            return res.status(500).send();
        }
        console.log(contacts);
        res.render('contacts', { contacts: contacts });
    });
};
router.get("/", display);
