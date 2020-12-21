var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');

const user = "cmps369";
let password = "finalproject";

bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hashed) {
        // console.log(hashed);
        password = hashed;
    });
});

router.get("/", (req, res) => {
    res.render("login", {});
})

router.post("/", async (req, res) => {
    console.log("logged");
    console.log(req.body.username);
    console.log(req.body.password);
    if (req.body.username !== user) {
        res.render('login', { message: "Invalid Username." });
    }
    else {
        const result = await bcrypt.compare(req.body.password, password);
        if (result) {
            req.session.user = req.body.username;
            console.log(`Welcome ${req.session.user}`);
            res.redirect("/contacts");
        } else {
            res.render('login', { message: "Invalid Password." });
        }
    }
});

module.exports = router;