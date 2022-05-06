var {Schema, model} = require('mongoose')

var juegosSchema = new Schema({
	nombreUsuario: String,
	puntuacion: Number
}, {
	timestamps: true,
	versionKey: false
})

const Juegos = model('Juego', juegosSchema)
module.exports = Juegos