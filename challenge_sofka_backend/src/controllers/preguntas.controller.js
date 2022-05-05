const Pregunta = require('../schemas/pregunta.schema')
const CategoriaSchema = require('../schemas/categorias.schema')

exports.getPreguntas = async(req, res) => {
	const preguntas = await Pregunta.find({}).populate({ path: 'categoria', model: CategoriaSchema })
	res.json(preguntas.map(pregunta => {
		return  {'pregunta': pregunta.pregunta, 'categoria': pregunta.categoria.texto }
	}))
}