const express = require('express');
var auth = require('./auth');
const verifikasi = require('./verifikasi');
var router = express.Router()
const multer = require('multer')

const fileStorage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null,'./images/')
    },
    filename : (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname)
    }
})


const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' ){
        cb(null, true)
    }else{
        cb(null, false)
    }
}

const upload = multer({storage:fileStorage, fileFilter:fileFilter})

router.post('/api/v1/register', auth.registrasi);
router.post('/api/v1/login', auth.login);

//endpoit with auth
router.get('/api/v1/home', verifikasi(),auth.all);
router.get('/api/v1/home/:id', verifikasi(),auth.allbyid);
router.post('/api/v1/home/add', verifikasi(),auth.add);
router.post('/api/v1/home/update/:id', verifikasi(),auth.put);
router.post('/api/v1/home/delete/:id', verifikasi(),auth.delete);
router.post('/api/v1/home/is_true/:id', verifikasi(),auth.is_true);
router.get('/api/v1/home/profile/:id', verifikasi(),auth.profile);
router.post('/api/v1/home/profile/edit/:id', verifikasi(),auth.edit_profile);
router.post('/api/v1/home/profile/foto/:id',upload.single('image'),verifikasi(),auth.edit_foto);

module.exports = router