const controller = require('../controllers/entries.controller')

module.exports = app => {
    //C
    app.post('/api/entries', controller.createProduct)
    //R
    app.get('/api/entries',controller.getAllProducts)
    app.get('/api/entries/:id', controller.getProduct)
    // // U
    // app.put('/api/entries/:id', controller.updateProduct)
    app.patch('/api/entries/:id', controller.addComment)
    //D
    app.delete('/api/entries/:id', controller.deleteProduct)
    app.put('/api/entries/cut/:id/:cid', controller.deleteComment)
}