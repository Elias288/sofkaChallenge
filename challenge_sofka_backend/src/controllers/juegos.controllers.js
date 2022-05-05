const Pregunta = require('../models/Pregunta')
const PreguntaSchema = require('../schemas/pregunta.schema')
const CategoriaSchema = require('../schemas/categorias.schema')
const Juego = require('../models/juego')

var newJuego = null

exports.createJuego = async (req, res) => {
	const preguntas = await PreguntaSchema.find({}).populate({ path: 'categoria', model: CategoriaSchema })
	
	const PreguntasO = preguntas.map( p => 
		new Pregunta(p._id.toString(), p.pregunta, p.opciones, p.respuesta, p.categoria.texto, p.categoria.nivel)
	)

	newJuego = new Juego(PreguntasO)
	res.json('juego creado')
}

exports.getJuego = (req, res) => {
	
	if (newJuego) {
		if (!newJuego.isEnded())
			res.json(newJuego.getPreguntaLevel())
		else 
			res.json({
				'msg': 'juego finalizado',
				'puntuacion': newJuego.puntuacion
			})
	} else {
		return res.json('juego no creado')
	}
}

exports.sendAnswer = (req, res) => {
	const { respuesta } = req.body

	if (newJuego) {
		if (!newJuego.isEnded()) {
			newJuego.guess(respuesta)
			res.json({ 'nivel': newJuego.preguntaLevel, 'puntuacion': newJuego.puntuacion })
		} else 
			res.json('juego finalizado')
	} else {
		return res.json('juego no creado')
	}
}