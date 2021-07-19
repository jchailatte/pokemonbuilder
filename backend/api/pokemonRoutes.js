const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const TeamSchema = new mongoose.Schema({
    email: String,
    team: Object
});

const Team = mongoose.model("teams", TeamSchema);

router.get("/", (req, res) => res.send("Pokemon Endpoint"));

router.get("/getteams", function (req, res) {
    Team.find({ "email": req.query.email })
        .exec()
        .then((docs, err) => {
            res.status(200);
            return res.json(docs)
        })
})

router.get("/getall", function (req, res) {
    Team.find({})
        .exec()
        .then((docs, err) => {
            res.status(200);
            return res.json(docs)
        })
})

router.delete('/deleteteam', function (req, res) {
    Team.remove({"_id": req.query.id})
        .exec()
        .then(() => {
            return res.status(200);
        })
});

router.post('/addteam', jsonParser, function (req, res) {
    var newTeam = new Team(req.body);
    newTeam.save(function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            res.send({ "id": result._id })
            console.log(result)
        }
    })
})

module.exports = router;