const express = require("express");
const PostModel = require("../models/posting");
const expressJwt = require("express-jwt");
const config = require("../config");
const postRoutes = express.Router();

postRoutes.use(expressJwt({ secret: config.secret }, (err, req, res, next) => {
    if (err) {
        res.status(401).send({
            success: false,
            msg: err.message
        });
    } else {
        next();
    }
}));

postRoutes.route("/")
    .get((req, res) => {
        PostModel.find(Object.assign({ user: req.user._id }, req.query), (err, postings) => {
            if (err) {
                res.status(500).send({
                    success: false,
                    msg: err.message
                });
            } else {
                res.status(200).send({
                    success: true,
                    postings
                });
            }
        });
    })
    .post((req, res) => {
        req.body.user = req.user._id;
        let newPost = new PostModel(req.body);
        newPost.save((err, post) => {
            if (err) {
                res.status(500).send({
                    success: false,
                    msg: err.message
                });
            } else {
                res.status(201).send({
                    success: true,
                    post
                });
            }
        });
    });
postRoutes.route("/:id")
    .get((req, res) => {
        PostModel.findById(req.params.id, (err, post) => {
            if (err) {
                res.status(500).send({
                    success: false,
                    msg: err.message
                });
            } else {
                res.status(200).send({
                    success: true,
                    post
                });
            }
        });
    })
    .delete((req, res) => {
        PostModel.findByIdAndRemove(req.params.id, (err, post) => {
            if (err) {
                res.status(500).send({
                    success: false,
                    msg: err.message
                });
            } else {
                res.status(200).send({
                    success: true,
                    id: post._id,
                    msg: `Job listing for ${post.title} at ${post.company} on ${post.createdAt.toLocaleDateString()} was successfully removed!`
                });
            }
        });
    })
    .put((req, res) => {
        PostModel.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, post) => {
            if (err) {
                res.status(500).send({
                    success: false,
                    msg: err.message
                });
            } else {
                res.status(200).send({
                    success: true,
                    post
                });
            }
        });
    });

module.exports = postRoutes;