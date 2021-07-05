var connection = require('../koneksi')
var mysql = require('mysql')
var md5 = require('md5')
var response = require('../res')
var jwt = require('jsonwebtoken')
var config = require('../config/secret')
var ip = require('ip')


// controller untuk register
exports.registrasi = function (req, res) {
    var post = {
        nama: req.body.nama,
        asal: req.body.asal,
        no_hp: req.body.no_hp,
        email: req.body.email,
        password: md5(req.body.password),
        role: 'member',
        tanggal_daftar: new Date()
    }

    var query = "SELECT email FROM ?? WHERE ??=?";
    var table = ['users', 'email', post.email]

    query = mysql.format(query, table)

    connection.query(query, function (error, rows) {
        if (error) {
            console.log(error)
        } else {
            if (rows.length == 0) {
                var query = "INSERT INTO ?? SET ?"
                var table = ['users']
                query = mysql.format(query, table)
                connection.query(query, post, function (error, rows) {
                    if (error) {
                        response.ok("Registrasi Gagal", res)
                        console.log(error)
                    } else {
                        response.ok("Registrasi Berhasil", res)
                    }
                })
            } else {
                response.ok("Email sudah terdaftar", res)
            }
        }
    })
}

//function login
exports.login = function (req, res) {
    var post = {
        password: req.body.password,
        email: req.body.email
    }

    var query = "SELECT * FROM ?? WHERE ??=? AND ??=?"
    var table = ['users', 'password', md5(post.password), 'email', post.email]

    query = mysql.format(query, table)

    connection.query(query, function (error, rows) {
        if (error) {
            response.error('Login Gagal', res)
            console.log(error)
        } else {
            if (rows.length == 1) {
                var token = jwt.sign({ rows }, config.secret, {
                    expiresIn: '365d'
                })
                id_user = rows[0].id
                role = rows[0].role

                var data = {
                    id_user: id_user,
                    ip_address : ip.address()
                }

                var query = "INSERT INTO ?? SET ?"
                var table = ['akses_token']

                query = mysql.format(query, table)

                connection.query(query, data, function (error, rows) {
                    if (error) {
                        console.log(error)
                        res.json({
                            success: false,
                            message: 'Email atau Password Salah!',
                            data: {}
                        });
                    } else {
                        res.json({
                            success: true,
                            message: 'Login Success',
                            data: {
                                id: data.id_user,
                                role: role,
                                token: token,
                            }
                        });
                    }
                })
            } else {
                res.json({
                    success: false,
                    message: 'Email atau Password Salah!',
                    data: {}
                });
            }
        }
    })

}


//page setelah auht
// semua data todo
exports.all = function (req, res) {
    connection.query('SELECT * FROM todos', function (error, rows, fileds) {
        if (error) {
            res.json({
                success: false,
                message: 'Access Data Failed',
                data: rows
            });
        } else {
            res.json({
                success: true,
                message: 'Success',
                data: rows
            });
        }
    })
}

// semua data todo berdasarkan id
exports.allbyid = function (req, res) {
    let id = req.params.id
    connection.query('SELECT * FROM todos WHERE id = ?', [id],
        function (error, rows, fileds) {
            if (error) {
                res.json({
                    success: false,
                    message: 'Access Data Failed',
                    data: rows
                });
            } else {
                res.json({
                    success: true,
                    message: 'success',
                    data: rows
                });
            }
        }
    )
}

//meambahakan data todo
exports.add = function (req, res) {
    var title = req.body.title
    var note = req.body.note
    var date = new Date()
    var is_true = req.body.is_true

    connection.query('INSERT INTO todos (title,note,date,is_true) VALUES(?,?,?,?)',
        [title, note, date, is_true],
        function (error, rows, fileds) {
            if (error) {
                console.log(error)
                res.json({
                    success: false,
                    message: 'Failed Add Data',
                });
            } else {
                res.json({
                    success: true,
                    message: 'Success Add Data',
                });
            }
        }
    )
}
//meambahakan data todo
exports.put = function (req, res) {
    var title = req.body.title
    var note = req.body.note
    var date = new Date()
    var is_true = req.body.is_true
    var id = req.params.id

    connection.query('UPDATE todos SET title=?,note=?,date=?,is_true=? WHERE id=?',
        [title, note, date, is_true, id],
        function (error, rows, fileds) {
            if (error) {
                console.log(error)
                res.json({
                    success: false,
                    message: 'Failed Update Data',
                });
            } else {
                res.json({
                    success: true,
                    message: 'Success Update Data',
                });
            }
        }
    )
}

// // Mengubah data todo berdasarkan ID
exports.delete = function (req, res) {
    var id = req.params.id

    connection.query('DELETE FROM todos WHERE id=?',
        [id],
        function (error, rows, fileds) {
            if (error) {
                res.json({
                    success: false,
                    message: 'Failed Delete Data',
                });
            } else {
                console.log(error)
                res.json({
                    success: true,
                    message: 'Success Delete Data',
                });
            }
        }
    )
}

// is_true todo 
exports.is_true = function (req, res) {
    var id = req.params.id
    var is_true = req.body.is_true

    connection.query('UPDATE todos SET is_true=? WHERE id=?',
        [is_true, id],
        function (error, rows, fileds) {
            if (error) {
                console.log(error)
                res.json({
                    success: false,
                    message: 'Checklist Failed',
                });
            } else {
                res.json({
                    success: true,
                    message: 'Checklist Success',
                });
            }
        }
    )
}


// semua data profile  berdasarkan id
exports.profile = function (req, res) {
    let id = req.params.id
    connection.query('SELECT * FROM users WHERE id = ?', [id],
        function (error, rows, fileds) {
            if (error) {
                res.json({
                    success: false,
                    message: 'Access Data Failed',
                    data: rows
                });
            } else {
                res.json({
                    success: true,
                    message: 'success',
                    data: rows
                });
            }
        }
    )
}

// edit data profile
exports.edit_profile = function (req, res) {
    var id = req.params.id
    var nama = req.body.nama
    var asal = req.body.asal
    var no_hp = req.body.no_hp
    var email = req.body.email

    connection.query('UPDATE users SET nama=?,asal=?,no_hp=?, email=? WHERE id=?',
        [nama, asal,no_hp, email, id],
        function (error, rows, fileds) {
            if (error) {
                console.log(error)
                res.json({
                    success: false,
                    message: 'Update Failed',
                });
            } else {
                res.json({
                    success: true,
                    message: 'Update Success',
                });
            }
        }
    )
}

// edit foto profile
exports.edit_foto = function (req, res) {
    var id = req.params.id
    var image = req.file.path
    console.log(req.file)

    connection.query('UPDATE users SET image=? WHERE id=?',
        [image, id],
        function (error, rows, fileds) {
            if (error) {
                console.log(error)
                res.json({
                    success: false,
                    message: 'Update Failed',
                });
            } else {
                res.json({
                    success: true,
                    message: 'Update Success',
                });
            }
        }
    )
}