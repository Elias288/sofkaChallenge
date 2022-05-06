const quizRoute = require('./routes/quiz.route')
const PreguntasRoute = require('./routes/pregunta.route')
const JuegoCtrl = require('./controllers/juego.controller')

const pkg = require('../package.json')

var express = require('express')
var cors = require('cors')
require('./database')

var app = express()

app.set('pkg', pkg)
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
	res.send({
		name : app.get('pkg').name,
		author: app.get('pkg').author,
		description: app.get('pkg').description,
		version: app.get('pkg').version
	})
})

app.use('/api/quiz', quizRoute)
app.use('/api/preguntas', PreguntasRoute)
app.use('/api/juegos', JuegoCtrl.getJuegos)

module.exports = app