const controller = require('../controllers/entries.controller')

module.exports = function(app) {
    //C
    app.post('/api/entries', controller.createProduct)
    //R
    app.get('/api/entries',controller.getAllProducts)
    app.get('/api/entries/:id', controller.getProduct)
    // U
    app.put('/api/entries/:id', controller.updateProduct)
    //D
    app.delete('/api/entries/:id', controller.deleteProduct)
}