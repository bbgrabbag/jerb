const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    company: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    salary: Number,
    datePosted: Date,
    applied: {
        type: Boolean,
        default: false
    },
    responded: {
        type: Boolean,
        default: false
    },
    notes: String
}, { timestamps: true });

module.exports = mongoose.model("posting", PostSchema);