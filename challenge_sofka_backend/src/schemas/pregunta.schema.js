const mongoose = require('mongoose')

var preguntaSchema = new mongoose.Schema({
	pregunta: String,
	categoria: {
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Categoria'
	},
	opciones: [String],
	respuesta: String
}, {
	timestamps: true,
	versionKey: false
})

const Pregunta = mongoose.model('Pregunta', preguntaSchema)
module.exports = Pregunta