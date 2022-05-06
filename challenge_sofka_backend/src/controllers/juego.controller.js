const juegosSchema = require('../schemas/juegos.schema')

exports.getJuegos = async (req, res) => {
	const juegos = await juegosSchema.find({})

	juegos.sort((a, b) => {
		return ( a.puntuacion > b.puntuacion ) ? -1 : (a.puntuacion < b.puntuacion) ? 1 : 0
	})
	
	res.json(juegos.slice(0, 5))
}