//dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const config = require("./config");
const apiRoutes = require("./routes/api");

//app
const app = express();

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "client", "build")));

//routes
app.use("/api", apiRoutes);
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
})

mongoose.connect(config.db, { useMongoClient: true }, () => {
    console.log("Connected to MLab");
    app.listen(config.port, () => {
        console.log("Connected to port " + config.port);
    });
});