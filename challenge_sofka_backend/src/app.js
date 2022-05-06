const pkg = require('../package.json')

const juegoRoute = require('./routes/juego.route')
const PreguntasRoute = require('./routes/pregunta.route')

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

app.use('/api/juego', juegoRoute)
app.use('/api/preguntas', PreguntasRoute)

module.exports = app