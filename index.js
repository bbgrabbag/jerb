//dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const config = require("./config");
const apiRoutes = require("./routes/api");

//app
const app = express();

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//routes
app.use("/api", apiRoutes);
// app.get("/")

mongoose.connect("mongodb://jerb-vschool:vschool@ds163826.mlab.com:63826/jerb", () => {
    console.log("Connected to MLab");
    app.listen(config.port, () => {
        console.log("Connected to port " + config.port);
    });
});