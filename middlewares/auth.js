function auth (req, res , next){
    if(!req.session.userLogged){
        return res.redirect('/users/inicio-sesion')
    }
    next();
}

module.exports = auth;