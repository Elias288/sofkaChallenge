const juegoController = require('../controllers/juegos.controllers')
const juegoRouter = require('express').Router()
const bodyParser = require('body-parser')

juegoRouter.use(bodyParser.urlencoded({ extended: true }))
juegoRouter.post('/answer',juegoController.sendAnswer )
juegoRouter.post('/',juegoController.createJuego )
juegoRouter.get('/', juegoController.getJuego )
// juegoRouter.put('/', )
// juegoRouter.delete('/', )

module.exports = juegoRouter
