const PreguntaSchema = require('../schemas/pregunta.schema')
const CategoriaSchema = require('../schemas/categorias.schema')

exports.getPreguntas = async(req, res) => {
	const preguntas = await PreguntaSchema.find({}).populate({ path: 'categoria', model: CategoriaSchema })
	res.json(preguntas.map(pregunta => {
		return  {'pregunta': pregunta.pregunta, 'categoria': pregunta.categoria.texto }
	}))
}

exports.createPregunta = async (req, res) => {
	const { pregunta, categoriaId, respuesta, opcion1, opcion2, opcion3 } = req.body

	if (!(pregunta || categoriaId || respuesta || opcion1 || opcion2 || opcion3 )){
		return res.json({ msg: 'dato faltante' })
	}

	try {
		const newPregunta = new PreguntaSchema({
			pregunta: pregunta,
			respuesta: respuesta,
		})

		const category = await CategoriaSchema.findById(categoriaId)
		if (!category || category === undefined) {
			return res.json({ msg: 'categoria no encotrada o no valida' })
		}
		
		newPregunta.categoria = category
		const shuffledArray = [respuesta, opcion1, opcion2, opcion3].sort(() => Math.random() - 0.5)
		newPregunta.opciones = shuffledArray
		
		await newPregunta.save()
		res.json({ msg: 'guardado con exito' })
	} catch (error) {
		console.log(error)
	}


}