const { Product } = require("../models/product.model")

module.exports.createProduct = (request, response) => {
    const{content, comments} = request.body
    Product.create({
        content, comments
    })
    .then(item => response.json(item))
    .catch(err => response.json(err))
}
module.exports.getAllProducts = (request,response) => {
    const{title, content} = request.body
    Product.find({})
    .then(catalog => response.json(catalog))
    .catch(err => response.json(err))
}

module.exports.getProduct = (request, response) => {
    Product.findOne({_id:request.params.id}) //its paramS man, remember!
    .then(data => response.json(data))
    .catch(err => response.json(err))
}

module.exports.deleteProduct = (request, response) => {
    Product.findOneAndDelete({_id:request.params.id}) 
    .then(deleteConfirmation => response.json(deleteConfirmation))
    .catch(err => response.json(err))
}

module.exports.updateProduct = (request, response) => {
    Product.findOneAndUpdate({_id:request.params.id},
        request.body, { runValidators: true, useFindAndModify: false, new: true}) 
    .then(data => response.json(data))
    .catch(err => response.json(err))
}