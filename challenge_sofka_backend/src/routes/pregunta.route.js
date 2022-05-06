const preguntaCtrl = require('../controllers/preguntas.controller')
const preguntaRoute = require('express').Router()
const bodyParser = require('body-parser')

preguntaRoute.use(bodyParser.urlencoded({ extended: true }))
preguntaRoute.get('/', preguntaCtrl.getPreguntas)
preguntaRoute.post('/', preguntaCtrl.createPregunta)

module.exports = preguntaRoute