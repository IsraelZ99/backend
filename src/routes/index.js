const { Router } = require('express');

const router = Router(); // Me va a permitir definir urls para el servidor(set, get)

const User = require('../models/user');

const jwt = require('jsonwebtoken');

/*
    Cuando se visite esta url, devolvera algo
*/
router.get('/', (req, res) => res.send('Hello world'));

router.post('/signup', async(req, res) => {
    /*console.log(req.body); //Ver los datos obtenidos a traves de POST */
    const { email, password } = req.body;
    const newUser = new User({ email: email, password: password });
    await newUser.save(); //Mientras realiza esto, puedo seguir avanzando

    const token = jwt.sign({ _id: newUser._id }, 'secretkey'); // Crear un token llamado secretKey

    res.status(200).json({ token }) //El servidor responde con status 200 (correcto)

});

router.post('/signin', async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send("The email doesn't exist");
    if (user.password !== password) return res.status(401).send("Wrong password");

    const token = jwt.sign({ _id: user._id }, 'secretkey');
    return res.status(200).json({ token });
});

router.get('/tasks', (req, res) => {
    res.json([{
            _id: 1,
            name: 'Task on',
            description: 'lorem ipsup',
            date: "2020-10-29T19:58:59.587Z"
        },
        {
            _id: 2,
            name: 'Task two',
            description: 'lorem ipsup',
            date: "2020-10-29T19:58:59.587Z"
        },
        {
            _id: 3,
            name: 'Task three',
            description: 'lorem ipsup',
            date: "2020-10-29T19:58:59.587Z"
        }
    ]);
});

router.get('/private-tasks', verifyToken, (req, res) => {
    res.json([{
            _id: 1,
            name: 'Task on',
            description: 'lorem ipsup',
            date: "2020-10-29T19:58:59.587Z"
        },
        {
            _id: 2,
            name: 'Task two',
            description: 'lorem ipsup',
            date: "2020-10-29T19:58:59.587Z"
        },
        {
            _id: 3,
            name: 'Task three',
            description: 'lorem ipsup',
            date: "2020-10-29T19:58:59.587Z"
        }
    ])
});

router.get('/profile', verifyToken, (req, res) => {
    res.send(req.userId);
});

module.exports = router;

function verifyToken(req, res, next) {
    if (!req.headers.authorization) { //Revisar que en la cabecera esta la palabra authorization
        return res.status(401).send('Unauthorized request');
    }

    const token = req.headers.authorization.split(' ')[1]; //Dividir bearer y el token
    if (token === 'null') {
        return res.status(401).send('Unauthorized request');
    }

    const payload = jwt.verify(token, 'secretkey');
    req.userId = payload._id //Guardar el id del usuario
    next();
}