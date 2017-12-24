const express = require("express");
const authRoutes = require("./auth");
const postingRoutes = require("./posting");
const profileRoutes = require("./profile");
const apiRoutes = express.Router();

apiRoutes.use("/auth", authRoutes);
apiRoutes.use("/postings", postingRoutes);
apiRoutes.use("/profile", profileRoutes);

module.exports = apiRoutes;