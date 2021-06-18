const mongoose = require('mongoose');
const { CommentSchema } = require('./comment.model')
const ProductSchema = new mongoose.Schema({
    // title: {
    //     type: String,
    //     required: [true, "- Dude, where is my title?"]
    // },
    content: {
        type: Object
    },
    comments: [CommentSchema]
    // decided to go with seperate schema insead of nested obj
},
    { timestamps: true });

module.exports.Product = mongoose.model('Product', ProductSchema)

