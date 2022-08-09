const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    author: {
        type: String,
        // required: [true, "Your comment must be at least 10 characters long"]
    },
    text: {
        type: String,
        // required: [true, "Your comment must be at least 10 characters long"]
    },
    rating: {
        type: Number,
        min: [1, "Rating must be at least 1 star"],
        max: [5, "Max rating is 5 stars"]
    },
    time : { type : Date, default: Date.now}
},
    { timestamps: true });

module.exports = { CommentSchema }

