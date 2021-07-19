var dotenv = require('dotenv')
var dotenvExpand = require('dotenv-expand')

var myEnv = dotenv.config()
dotenvExpand(myEnv);

const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const mongoose = require("mongoose");

mongoose
    .connect(process.env.MONGO_LOCAL_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log("Database connected!"))
    .catch((err) => console.log(err))

const port = 3080;
const uri = "mongodb://localhost:27017/details";

app.listen(port, function () {
    console.log("Server is running on Port: " + port);
});

/*-------------------- Routes ------------------------*/

app.get("/", (req, res) => res.send("Server is up and running"));

var pokemonRoutes = require("./api/pokemonRoutes.js");
app.use("/pokemon", pokemonRoutes);