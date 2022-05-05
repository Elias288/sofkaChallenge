const mongoose = require('mongoose')

var preguntaSchema = new mongoose.Schema({
    pregunta: String,
    nivel: Number,
    categoria: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'categorias'
    },
    opciones: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'opciones'
    }]
}, {
	timestamps: true,
	versionKey: false
})

const Pregunta = mongoose.model('preguntas', preguntaSchema)
module.exports = Pregunta