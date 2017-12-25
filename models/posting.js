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
    salary: {
        type: Number,
        default: 0
    },
    contact: String,
    contactEmail: String,
    contactPh: String,
    offerAmt: {
        type: Number,
        default: 0
    },
    datePosted: Date,
    applied: {
        type: Boolean,
        default: false
    },
    responded: {
        type: Boolean,
        default: false
    },
    notes: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("posting", PostSchema);