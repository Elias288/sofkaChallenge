const juegosSchema = require('../schemas/juegos.schema')

/**
 * 
 * @param {String} nombreUsuario 
 * @param {Number} puntuacion 
 */
const newJuego = async (nombreUsuario, puntuacion) => {

	// Busca el juego
	const juego = await juegosSchema.findOne({ nombreUsuario })

	// Si existe el juego
	if (juego) {
		juegosSchema.updateOne({ nombreUsuario }, { puntuacion })
		
		// Si no existe el juego
	} else {
		const juegoNuevo = new juegosSchema({
			nombreUsuario,
			puntuacion
		})
		await juegoNuevo.save()	
	}
}

module.exports = newJuego