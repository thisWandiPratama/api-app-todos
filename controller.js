'use strict';

var response = require('./res');

var connection = require('./koneksi');


exports.index = function (req, res) {
    response.ok('Aplikasi REST API telah berjalan!', res)
}

// semua data mahasiswa
exports.all = function (req, res) {
    connection.query('SELECT * FROM todos', function (error, rows, fileds) {
        if (error) {
            console.log(error)
        } else {
            response.ok(rows, res)
        }
    })
}


// semua data mahasiswa berdasarkan id
exports.allbyid = function (req, res) {
    let id = req.params.id
connection.query('SELECT * FROM mahasiswa WHERE id_mahasiswa = ?', [id],
        function (error, rows, fileds) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        }
    )
}


//meambahakan data mahasiswa
exports.add = function(req, res){
    var nim = req.body.nim
    var nama = req.body.nama
    var jurusan = req.body.jurusan

    
    connection.query('INSERT INTO mahasiswa (nim,nama,jurusan) VALUES(?,?,?)',
    [nim,nama,jurusan],
    function (error, rows, fileds) {
        if (error) {
            response.error('Gagal Menambahkan Data!', res)
            console.log(error)
        } else {
            response.ok('Berhasil Menambahkan Data!', res)
        }
    }
    )
}


// Mengubah data mahasiswa berdasarkan ID
exports.put = function(req, res){
    var id = req.body.id_mahasiswa
    var nim = req.body.nim
    var nama = req.body.nama
    var jurusan = req.body.jurusan

    
    connection.query('UPDATE mahasiswa SET nim=?,nama=?,jurusan=? WHERE id_mahasiswa=?',
    [nim,nama,jurusan, id],
    function (error, rows, fileds) {
        if (error) {
            response.error('Gagal Mengedit Data!', res)
            console.log(error)
        } else {
            response.ok('Berhasil Mengedit Data!', res)
        }
    }
    )
}

// Mengubah data mahasiswa berdasarkan ID
exports.delete = function(req, res){
    var id = req.body.id_mahasiswa
    
    connection.query('DELETE FROM mahasiswa WHERE id_mahasiswa=?',
    [id],
    function (error, rows, fileds) {
        if (error) {
            response.error('Gagal Menghapus Data!', res)
            console.log(error)
        } else {
            response.ok('Berhasil Menghapus Data!', res)
        }
    }
    )
}


//get matakuliah
exports.groupmatakuliah = function(req, res){
    connection.query('SELECT mahasiswa.id_mahasiswa, mahasiswa.nim, mahasiswa.nama, mahasiswa.jurusan, matakuliah.matakuliah, matakuliah.sks from krs JOIN matakuliah JOIN mahasiswa WHERE krs.id_matakuliah = matakuliah.id_matakuliah AND krs.id_mahasiswa = mahasiswa.id_mahasiswa ORDER BY mahasiswa.id_mahasiswa', 
    function (error, rows, fileds) {
        if (error) {
            response.error('Gagal Menampilkan Data!', res)
            console.log(error)
        } else {
            response.nested(rows, res)
        }
    }
    )
}