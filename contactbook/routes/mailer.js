var express = require('express');
var router = express.Router();
module.exports = router;

// GET home page where user fill out a new form. 
const home = async (req, res, next)=> {
  res.render('home', { title: 'Contacts Form' });
  // const r = await req.geocoder.geocode('505 Ramapo Valley Road, Mahwah, NJ, 07430');
  // console.log(r);
};


// POST after the form is submitted, and insert information into the database.
// Display a thankyou page!
const posted = (req, res, next) => {
  console.log('enters post');
  var contact_obj = {
    prefix: req.body.prefix,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    phone: req.body.phone,
    email: req.body.email,
    pref_any: req.body.pref_any,
    pref_phone: req.body.pref_phone,
    pref_mail: req.body.pref_mail,
    pref_email: req.body.pref_email
  };
  
  result = req.contacts.insertOne(contact_obj, async (err, document) => {
    const entry = document.ops[0];
    const address = entry.street + ", " + entry.city + ", " + entry.state + ", " + entry.zip;
    const location = await req.geocoder.geocode(address);
    // console.log(location);
    const latitude= location[0].latitude;
    const longitude = location[0].longitude;
    await req.contacts.updateOne({ _id: entry._id }, {
      $set: {
        "latitude": latitude,
        "longitude": longitude}
    }
    );
  });
  // console.log(result);
  res.render("success", {});
}


router.get('/', home);
router.get('/mailer', home);
router.post('/mailer', posted);
