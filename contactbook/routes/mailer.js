var express = require('express');
var router = express.Router();
var db = require('./database');

/**
 * Home(): renders the home page that allows the user to submit a new form entry
 */
const Home = (req, res, next) => {
  res.render('mailer', { title: 'Contacts Form' });
};

/**
 * Posted(): inserts new entry into database and shows a thankyou page
 */
const Posted = async (req, res, next) => {
  const entry = req.body;
  var contact = {
    prefix: entry.prefix,
    firstName: entry.firstName,
    lastName: entry.lastName,
    street: entry.street,
    city: entry.city,
    state: entry.state,
    zip: entry.zip,
    phone: entry.phone,
    email: entry.email,
    prefPhone: false,
    prefEmail: false,
    prefMail: false,
    latitude: null,
    longitude: null
  };
  if (entry.prefAny) {
    contact.prefPhone = true;
    contact.prefEmail = true;
    contact.prefMail = true;
    
  }
  else if (entry.prefPhone) {
    contact.prefPhone = true;
  }
  else if (entry.prefEmail) {
    contact.prefEmail = true;
  }
  else if (entry.prefMail) {
    contact.prefMail = true;
  }
  // console.log(contact);

  const address = entry.street + ", " + entry.city + ", " + entry.state + ", " + entry.zip;
  const location = await req.geocoder.geocode(address);
  if (location[0]===undefined) {
    console.error("Address location not found. Co-ordinates set to default: null.");
  }
  else {
    const latitude = location[0].latitude;
    const longitude = location[0].longitude;
    contact.latitude = latitude;
    contact.longitude = longitude;      
  }
  try { 
    db.Add(contact);
  }
  catch (error) {
    res.sendStatus(500);
    return;
  }
  res.render("success", {});
};

// ***********************requests to /mailer********************************
router.get('/', Home);
router.get('/mailer', Home);
router.post('/mailer', Posted);
router.get('/index', (req, res, next) => {
  res.render('index', { title: "Title" });
})

module.exports = router;
