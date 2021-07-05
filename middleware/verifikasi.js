const jwt = require('jsonwebtoken')

const config = require('../config/secret')

function verifikasi (){
    return function(req, res, next){
        var role = req.body.role
        console.log(req.body.image)
        //cek di header
        var tokenWithBearer = req.headers.authorization
        if(tokenWithBearer){
            var token  = tokenWithBearer.split(' ')[1]

            //verifikasi
            jwt.verify(token, config.secret, function(err, decoded){
                if(err){
                    return rest.status(401).send({success: false,message: 'Token tidak ditemukan'})
                }else{
                    if(role == 'member'){
                        req.auth = decoded
                        next()
                    }else{
                    return res.status(401).send({success:false, message: 'Role tidak ditemukan'})
                    }
                }
            })
        }else{
            return rest.status(401).send({success:false, message: 'Token tidak tersedia'})
        }
    }
}

module.exports = verifikasi