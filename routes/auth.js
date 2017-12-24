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
                    code: 400,
                    msg: err.message
                });
            }
            if (!user) {
                let newUser = new UserModel(req.body);
                newUser.save((err, savedUser) => {
                    if (err) {
                        return res.send({
                            success: false,
                            code: 400,
                            msg: err.message
                        });
                    }
                    res.send({
                        success: true,
                        user: savedUser.withoutPwd(),
                        token: jwt.sign(savedUser.withoutPwd(), config.secret, { expiresIn: 60 * 60 })
                    });
                });
            } else {
                res.send({
                    success: false,
                    code: 401,
                    msg: "User already exists!"
                });
            }
        });
    });
authRoutes.route("/login")
    .post((req, res) => {
        UserModel.findOne({ username: req.body.username }, (err, user) => {
            if (err) {
                res.send({
                    success: false,
                    code: 400,
                    msg: err.message
                });
            } else {
                if (!user) {
                    res.send({
                        success: false,
                        code: 404,
                        msg: "User not found!"
                    });
                } else {
                    if (user.auth(req.body.password)) {
                        res.send({
                            success: true,
                            user: user.withoutPwd(),
                            token: jwt.sign(user.withoutPwd(), config.secret, { expiresIn: 60 * 60 })
                        });
                    } else {
                        res.send({
                            success: false,
                            code: 401,
                            msg: "Invalid password!"
                        })
                    }
                }
            }
        })
    })


module.exports = authRoutes;