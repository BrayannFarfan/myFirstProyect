const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');

const user = require('../model/users');

const userController = {
    register: (req, res) => {
        res.render('registro');
    },
    registerPro: (req, res) => {
        const error = validationResult(req)
        if (error.errors.length > 0) {
            res.render('registro', {
                errors: error.mapped(),
                datoIngresado: req.body
            });
        }
        let usuarioEnElJson = user.fineByField('email', req.body.email);
        if (usuarioEnElJson) {
            return res.render('registro', {
                errors: {
                    email: {
                        msg: 'Este Email ya esta registrado, ingrese otro Email'
                    }
                },
                datoIngresado: req.body
            });

        }
        let imagenAvatar = (req.file == undefined) ? "index.png" : req.file.originalname

        let userACrear = {
            ...req.body,
            clave: bcryptjs.hashSync(req.body.clave, 10),
            imageUsuario: imagenAvatar
        }
        user.create(userACrear);
        res.redirect('inicio-sesion')
    },
    login: (req, res) => {
        res.render('inicio-sesion')
    },
    loginPro: (req, res) => {
        let userLogiado = user.fineByField('email', req.body.email);
        if (userLogiado) {
            let clave = bcryptjs.compareSync(req.body.clave, userLogiado.clave);
            if (clave) {
                delete userLogiado.clave;
                req.session.userLogged = userLogiado;
                res.redirect('/users/profile')
            }
            return res.render('inicio-sesion', {
                errors: {
                    email: {
                        msg: 'Las credenciales son incorrectas'
                    }
                }
            });
        }
        return res.render('inicio-sesion', {
            errors: {
                email: {
                    msg: 'No se encontro email en nuestra base de datos'
                }
            }
        });
    },
    profile: (req, res) => {
        return res.render('profile', {
            user: req.session.userLogged
        });
    },
    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/users/inicio-sesion')
    }
}

module.exports = userController