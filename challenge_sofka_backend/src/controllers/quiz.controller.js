const Pregunta = require('../models/Pregunta')
const PreguntaSchema = require('../schemas/pregunta.schema')
const CategoriaSchema = require('../schemas/categorias.schema')
const Quiz = require('../models/Quiz')
const saveJuego = require('../controllers/juegoNuevo')


var newQuiz = null

exports.createQuiz = async (req, res) => {
	const { username } = req.body
	if (!username) return res.json({ msg: 'no se registro un usuario' })

	// Obtiene la lista de preguntas en la BD
	const preguntas = await PreguntaSchema.find({}).
		populate({
			path: 'categoria',
			model: CategoriaSchema
		})
	
	// Crea la lista de objetos preguntas con las preguntas de la BD
	const PreguntasO = preguntas.map( p => 
		new Pregunta (
			p._id.toString(),
			p.pregunta,
			p.opciones.sort(() => Math.random() - 0.5),
			p.respuesta,
			p.categoria.texto,
			p.categoria.nivel
		)
	)

	// Crea la quiz nueva
	newQuiz = new Quiz(PreguntasO, username)

	res.json({msg: 'Quiz creada'})
}

exports.getQuiz = (req, res) => {
	if (newQuiz) {
		// Comprueba si el juego ha terminado y por qué
		const ronda = {
			// El juego continua
			0: newQuiz.getPreguntaLevel(), 
			// El juego finalizó porque se llegó a la ultima pregunta
			1: { 'msg': 'Felicitaciones, Has Ganado', 'puntuacion': newQuiz.puntuacion },
			// El juego finalizó porque no seleccionó la pregunta correcta
			2: { 'msg': 'Juego terminado', 'puntuacion': newQuiz.puntuacion } 
		}		
		res.json(ronda[newQuiz.isEnded()]) // Envia la respuesta

		// Persiste el usuario cuando el juego finaliza
		if (newQuiz.isEnded() === 1 || newQuiz.isEnded() === 2) {
			saveJuego(newQuiz.userName, newQuiz.puntuacion)
		}

	} else {
		return res.json('Quiz no creada')
	}
}

exports.sendAnswer = (req, res) => {
	if (newQuiz) {
		// Si el juego no finalizó
		if (newQuiz.isEnded() === 1 || newQuiz.isEnded() === 2 || req.body.respuesta) {
			// Envia la respuesta ingresada
			newQuiz.guess(req.body.respuesta)
			// Devuelve el nuevo nivel y la puntuacion acumulada
			res.json({ 'nivel': newQuiz.preguntaLevel, 'puntuacion': newQuiz.puntuacion })
		}
	} else {
		return res.json('Quiz no creada')
	}
}