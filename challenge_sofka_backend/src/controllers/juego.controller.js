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
	res.json({msg: 'juego creado'})
}


exports.getJuego = (req, res) => {
	
	if (newJuego) {
		const ronda = {
			0: newJuego.getPreguntaLevel(),
			1: { 'msg': 'Felicitaciones, Has Ganado', 'puntuacion': newJuego.puntuacion },
			2: { 'msg': 'Juego terminado', 'puntuacion': newJuego.puntuacion }
		}		
		res.json(ronda[newJuego.isEnded()])
	} else {
		return res.json('juego no creado')
	}
}

exports.sendAnswer = (req, res) => {
	if (newJuego) {
		if (newJuego.isEnded() === 1 || newJuego.isEnded() === 2 || req.body.respuesta) {
			newJuego.guess(req.body.respuesta)
			res.json({ 'nivel': newJuego.preguntaLevel, 'puntuacion': newJuego.puntuacion })
		}
	} else {
		return res.json('juego no creado')
	}
}