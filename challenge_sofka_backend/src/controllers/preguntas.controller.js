const Preguntas = require('../schemas/preguntas')
const Opciones = require('../schemas/opciones')

exports.getPreguntas = async (req, res) => {
    const preguntas = await Preguntas.find({}).populate('opciones')
    res.json(preguntas)
}