'use strict';

exports.ok = function(values, res){
    var data = {
        'status' : true,
        'message' : values
    }

     res.json(data);
     res.end()
}

exports.error = function(values, res){
    var data = {
        'status' : false,
        'message' : values
    }

     res.json(data);
     res.end()
}

///response untuk nested matakuliah
exports.nested = function(values, res){
    //lakukan akumulasi dulu
    const hasil = values.reduce((akumualsi, item ) => {
        //tentukan key group
        if(akumualsi[item.nama]){
            //buat variabel group nama matakulaih
            const group = akumualsi[item.nama]
            //cek jika isi array adalah matakuliah
            if(Array.isArray(group.matakuliah)){
                //tambahkan value ke dalam group matakuliah
                group.matakuliah.push(item.matakuliah)
            }else{
                group.matakuliah = [group.matakuliah, item.matakuliah]
            }
        }else{
            akumualsi[item.nama] = item
        }
        return akumualsi
    },{})

    var data = {
        'status' : true,
        'message' : hasil
    }

     res.json(data);
     res.end()
}