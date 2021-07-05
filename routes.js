'use strict';

module.exports = function (app) {
    var jsonku = require('./controller')

    app.route('/')
        .get(jsonku.index)

    app.route('/home')
        .get(jsonku.all)

    app.route('/home/:id')
        .get(jsonku.allbyid)

    app.route('/add')
        .post(jsonku.add)
    app.route('/put')
        .put(jsonku.put)
    
    app.route('/delete')
        .delete(jsonku.delete)

        app.route('/matakuliah')
        .get(jsonku.groupmatakuliah)
}