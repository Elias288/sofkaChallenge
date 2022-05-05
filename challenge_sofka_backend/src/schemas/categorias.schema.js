var {Schema, model} = require('mongoose')

var categoriaSchema = new Schema({
	texto: String,
	nivel: Number
}, {
	timestamps: true,
	versionKey: false
})

const Categoria = model('Categoria', categoriaSchema)
module.exports = Categoria