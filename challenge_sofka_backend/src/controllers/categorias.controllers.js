const Categoria = require('../schemas/categorias')

exports.getCategorias = async(req, res) => {
    const cat = await Categoria.find({})
    res.json(cat)
}
exports.getPreguntasDeCategorias = (req, res) => {po0

}