class Pregunta {
	/**
     *
	 * @param {string} id
     * @param {string} text la pregunta
     * @param {string[]} choices la lista de opciones
     * @param {string} answer la respuesta
	 * @param {string} category la categoria de la pregunta
	 * @param {int} catLevel el nivel de la categoria
     */
	constructor(id, text, choices, answer, category, catLevel) {
		this.id = id
		this.text = text
		this.choices = choices
		this.answer = answer
		this.category = category
		this.categoryLevel = catLevel
	}
  
	/**
     *
     * @param {string} choice la opcion seleccionada
     * @returns {boolean} retora si la opcion es correcta
     */
	correctAnswer(choice) {
		return choice === this.answer
	}
}
  
module.exports = Pregunta