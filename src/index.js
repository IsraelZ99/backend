const express = require('express'); //Requerir el modulo express
const app = express(); //Ejecutar el modulo y lo guardamos en una constante
const cors = require('cors');

require('./database'); //Mandar a llamar al archiov de la base de datos

app.use(cors()); //Permite la entrada de datos externos (cabeceras)
app.use(express.json()); // Permite que los datos obtenidos los convierta a JSON

app.use('/api', require('./routes/index'));

app.listen(3000); //Iniciar el servidor
console.log('Server on port', 3000);