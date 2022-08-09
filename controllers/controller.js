const { Product } = require("../models/product.model")

module.exports.createProduct = (request, response) => {
    const { content, title, comments } = request.body
    Product.create({
        content, title, comments
    })
        .then(item => response.json(item))
        .catch(err => response.json(err))
}
module.exports.getAllProducts = (request, response) => {
    const { title, content } = request.body
    Product.find({})
        .then(catalog => response.json(catalog))
        .catch(err => response.json(err))
}

module.exports.getProduct = (request, response) => {
    Product.findOne({ _id: request.params.id }) //its paramS man, remember!
        .then(data => response.json(data))
        .catch(err => response.json(err))
}

module.exports.deleteProduct = (request, response) => {
    Product.findOneAndDelete({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}
module.exports.deleteComment = (request, response) => {
    Product.findOneAndUpdate(
        { _id: request.params.id },
        {
            $pull: { comments: { _id: request.params.cid } }
        },
        { new: true }
    )
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}

// module.exports.updateProduct = (request, response) => {
//     Product.findOneAndUpdate({ _id: request.params.id },
//         request.body, { runValidators: true, useFindAndModify: false, new: true })
//         .then(data => response.json(data))
//         .catch(err => response.json(err))
// }
module.exports.addComment = (req, res) => {
    Product.findOne({ _id: req.params.id, 'comments.author': req.body.author })
        .then(data => {
            if (data == null) {
                return Product.findOneAndUpdate({ _id: req.params.id },
                    { $addToSet: { comments: req.body } },
                    { runValidators: true, useFindAndModify: false, new: true })
            } else {
                res.json({ err: "You already posted a comment.." });
            }
        })
        .then(data => res.json(data))
        .catch(err => res.json(err))
}
// module.exports.addComment = (req, res) => {
//         Product.findOneAndUpdate({ _id: req.params.id },
//             // req.body,
//                 { $addToSet: {comments: req.body} },
//                 { useFindAndModify: false, new: true })
//                 .then(data=>res.json(data))
//                 .catch(err=>res.json(err))
//                 console.log("ssss")
//         }
