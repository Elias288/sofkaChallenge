const pkg = require('../package.json')

// const usersRoutes = require('./routes/users.routes')
const juegoController = require('./controllers/juegos.controllers')
const categoriaController = require('./controllers/categorias.controllers')
const preguntaConrtoller = require('./controllers/preguntas.controller')

var express = require('express')
var cors = require('cors')
require('./database')

var app = express()

app.set('pkg', pkg)
app.use(cors({ credentials: true }))
app.use(express.json())

app.get('/', (req, res) => {
	res.send({
		name : app.get('pkg').name,
		author: app.get('pkg').author,
		description: app.get('pkg').description,
		version: app.get('pkg').version
	})
})

app.use('/api/juego', juegoController.createJuego)
app.use('/api/categorias', categoriaController.getCategorias)
app.use('/api/preguntas', preguntaConrtoller.getPreguntas)

module.exports = app