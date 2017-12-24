const express = require("express");
const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../config");
const authRoutes = express.Router();

authRoutes.route("/signup")
    .post((req, res) => {
        UserModel.findOne({ username: req.body.username }, (err, user) => {
            if (err) {
                res.send({
                    success: false,
                    code: err.status,
                    msg: err.message
                });
            }
            if (!user) {
                let newUser = new UserModel(req.body);
                newUser.save((err, savedUser) => {
                    if (err)
                        return res.send({
                            success: false,
                            code: err.status,
                            msg: err.message
                        });
                    res.send({
                        success: true,
                        user: savedUser,
                        token: jwt.sign(savedUser.toObject(), config.secret, { expiresIn: 60 * 60 })
                    })
                })
            } else {
                res.send({
                    success: false,
                    code: 404,
                    msg: "User already exists!"
                })
            }
        });
    });


module.exports = authRoutes;