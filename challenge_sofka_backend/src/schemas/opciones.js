const mongoose = require('mongoose')

var opcionesSchema = new mongoose.Schema({
    respuesta: String
}, {
	timestamps: true,
	versionKey: false
})

const Opcion = mongoose.model('opciones', opcionesSchema)
module.exports = Opcion