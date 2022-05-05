var {Schema, model} = require('mongoose')

var categoriaSchema = new Schema({
    categoria: String
}, {
	timestamps: true,
	versionKey: false
})

const Categoria = model('categorias', categoriaSchema)
module.exports = Categoria