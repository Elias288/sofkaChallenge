const juegosSchema = require('../schemas/juegos.schema')

exports.getJuegos = async (req, res) => {
	const juegos = await juegosSchema.find({})
	
	res.json(juegos)
}