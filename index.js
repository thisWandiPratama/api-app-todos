const express = require('express');
const bodyParser = require('body-parser')
var morgan = require('morgan')
const app = express()

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));


//daftarkan menu router dari index
app.use('/auth', require('./middleware'));
app.use(express.static('images'));
app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});