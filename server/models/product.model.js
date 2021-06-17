const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    // title: {
    //     type: String,
    //     required: [true, "- Dude, where is my title?"]
    // },
    content: {
        type: Object
    },
    title: { type: String, required: [true, "- Dude, where is my title?"] },
    comments: { type: Object }
},
    { timestamps: true });

module.exports.Product = mongoose.model('Product', ProductSchema)

