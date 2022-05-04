const pkg = require('../package.json')

// const usersRoutes = require('./routes/users.routes')

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

// app.use('/api/users', usersRoutes)

module.exports = app