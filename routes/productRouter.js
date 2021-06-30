const express = require('express');

const router = express.Router();
const productController = require('../controller/productController');

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: path.resolve(__dirname, '../public/img'),
    filename: (req, file, cb) =>{cb(null, 'img-' + Date.now() + path.extname(file.originalname))}
});


const { body } = require('express-validator')


const upload = multer({storage})



const validaciones = [
   
    body('name').notEmpty().withMessage('En nombre no puede estar en blanco').bail()
    
    .isString().withMessage('Deber ser un String'),

    body('price').notEmpty().withMessage('En precio no puede estar en blanco'),
    body('descuento').notEmpty().withMessage('En descuento no puede estar en blanco'),
  
    body('image').custom((value, {req}) => {
     let file = req.file
     // Si es undefined, se relaciona con  Multer
     if ( !file) {
        throw new Error('Debe agregar una foto');
      }

     return true

    })
]

const validacionesEdit = [
   
    body('name').notEmpty().withMessage('En nombre no puede estar en blanco').bail()
    
    .isString().withMessage('Deber ser un String'),

    body('price').notEmpty().withMessage('En precio no puede estar en blanco'),
    body('descuento').notEmpty().withMessage('En descuento no puede estar en blanco')
  
] 

router.get('/listar', productController.listar)

router.get('/listarborrado', productController.listarDelete)

router.get('/edit/:id', productController.edit)

router.get('/detail/:id', productController.detail)

router.get('/create', upload.single('image'),productController.create)

router.post('/store', upload.single('image'),validaciones, productController.store);

router.put('/:id', upload.single('image'), validacionesEdit,productController.update);

router.put('/:id/recover', productController.recover);

router.delete('/:id', productController.destroy);

module.exports = router;