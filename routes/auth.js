const express = require("express");
const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../config");
const authRoutes = express.Router();

authRoutes.route("/signup")
    .post((req, res) => {
        UserModel.findOne({ username: req.body.username }, (err, user) => {
            if (err) {
                res.status(500).send({
                    success: false,
                    msg: err.message
                });
            }
            if (!user) {
                let newUser = new UserModel(req.body);
                newUser.save((err, savedUser) => {
                    if (err) {
                        return res.status(500).send({
                            success: false,
                            msg: err.message
                        });
                    }
                    res.status(200).send({
                        success: true,
                        user: savedUser.withoutPwd(),
                        token: jwt.sign(savedUser.withoutPwd(), config.secret, { expiresIn: 60 * 60 })
                    });
                });
            } else {
                res.status(401).send({
                    success: false,
                    msg: "User already exists!"
                });
            }
        });
    });
authRoutes.route("/login")
    .post((req, res) => {
        UserModel.findOne({ username: req.body.username }, (err, user) => {
            if (err) {
                res.status(500).send({
                    success: false,
                    msg: err.message
                });
            } else {
                if (!user) {
                    res.status(404).send({
                        success: false,
                        msg: "User not found!"
                    });
                } else {
                    if (user.auth(req.body.password)) {
                        res.status(200).send({
                            success: true,
                            user: user.withoutPwd(),
                            token: jwt.sign(user.withoutPwd(), config.secret, { expiresIn: 60 * 60 })
                        });
                    } else {
                        res.status(401).send({
                            success: false,
                            msg: "Invalid password!"
                        })
                    }
                }
            }
        })
    })


module.exports = authRoutes;