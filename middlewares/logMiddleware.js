const fs = require('fs')



function logMiddleware(req,res, next){
    fs.appendFileSync('log.txt', ' -Ingresaste a la página:' + req.url )
    next()
    }
    
    module.exports = logMiddleware