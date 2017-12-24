const express = require("express");
const UserModel = require("../models/user");
const PostModel = require("../models/posting");
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const config = require("../config");

const profileRoutes = express.Router();

profileRoutes.use(expressJwt({ secret: config.secret }, (err, req, res, next) => {
    if (err) {
        res.status(401).send({
            success: false,
            msg: err.message
        });
    } else {
        next();
    }
}));

profileRoutes.route("/")
    .get((req, res) => {
        UserModel.findById(req.user._id, (err, user) => {
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
                    res.status(200).send({
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
                res.status(500).send({
                    success: false,
                    msg: err.message
                })
            } else {
                if (!user) {
                    res.status(404).send({
                        success: false,
                        msg: "User not found!"
                    })
                } else {
                    PostModel.remove({ user: req.user._id }, (err, postings) => {
                        if (err) {
                            res.status(500).send({
                                success: false,
                                msg: err.message
                            })
                        }
                    });
                    res.status(200).send({
                        success: true,
                        msg:  `Account of ${user.username} successfully deleted!`
                    });
                }
            }
        });
    })
    .put((req, res) => {
        UserModel.findByIdAndUpdate(req.user._id, req.body, { new: true }, (err, user) => {
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
                    })
                } else {
                    res.status(200).send({
                        success: true,
                        user: user.withoutPwd()
                    });
                }
            }
        })
    })

module.exports = profileRoutes;