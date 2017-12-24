const express = require("express");
const UserModel = require("../models/user");
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const config = require("../config");

const profileRoutes = express.Router();

profileRoutes.use(expressJwt({ secret: config.secret }))

profileRoutes.route("/")
    .get((req, res) => {
        UserModel.findById(req.user._id, (err, user) => {
            if (err) {
                res.send({
                    sucess: false,
                    code: 400,
                    msg: err.message
                });
            } else {
                if (!user) {
                    res.send({
                        sucess: false,
                        code: 404,
                        msg: "User not found!"
                    });
                } else {
                    res.send({
                        success: true,
                        user: user.withoutPwd()
                    });
                }
            }
        });
    })
    .delete((req, res) => {
        UserModel.findByIdAndRemove(req.user._id, (err, user) => {
            if (err) {
                res.send({
                    sucess: false,
                    code: 400,
                    msg: err.message
                })
            } else {
                if (!user) {
                    res.send({
                        sucess: false,
                        code: 404,
                        msg: "User not found!"
                    })
                } else {
                    res.send({
                        success: true,
                        username: user.username,
                        msg: "User successfully deleted!"
                    })
                }
            }
        });
    })
    .put((req, res) => {
        UserModel.findByIdAndUpdate(req.user._id, req.body, { new: true }, (err, user) => {
            if(err){
                res.send({
                    sucess: false,
                    code: 400,
                    msg: err.message
                });
            } else {
                if (!user) {
                    res.send({
                        sucess: false,
                        code: 404,
                        msg: "User not found!"
                    })
                } else {
                    res.send({
                        success: true,
                        user: user.withoutPwd()
                    })
                }
            }
        })
    })

module.exports = profileRoutes;