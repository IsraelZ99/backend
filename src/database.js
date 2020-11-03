const mongoose = require('mongoose'); //Requerir el modulo mongose

mongoose.connect('mongodb://localhost/angular-auth', { //Conectarme y crear a una base de datos
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err))