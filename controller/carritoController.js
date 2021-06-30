let productos = require('../data/productos.json')

let carritoController = {

    index: (req,res) => {
        res.render('carrito')
    }
}

module.exports = carritoController