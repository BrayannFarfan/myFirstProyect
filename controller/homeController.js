let productos = require('../model/jsonDataBase');
let products = require('../data/productos.json')
let productModel = productos('productos');
let homeController = {

    leerTodos: (req, res) => {
        let product = productModel.all();
        console.log(product)
        res.render('index', { product })
    },

}

module.exports = homeController