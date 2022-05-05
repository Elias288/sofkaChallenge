//@ts-check
// eslint-disable-next-line no-unused-vars
const Pregunta = require('../models/Pregunta')

class Juego {
	puntuacion = 0
	preguntaLevel = 1
	finalizado = false
	pregunta = null

	/**
   *
   * @param {Pregunta[]} questions
   */
	constructor(questions) {
		this.questions = questions
	}

	/**
	 * 
	 * @returns {Pregunta} 
	 */
	getPreguntaLevel() {
		const levelQuestions = this.questions.filter(pregunta => pregunta.categoryLevel === this.preguntaLevel)
		this.pregunta = levelQuestions[Math.floor(Math.random()*levelQuestions.length)]
		return this.pregunta
		// return this.questions[this.preguntaLevel]
	}
	/**
	 * 
	 * @returns {Pregunta[]} 
	 */
	getPreguntasLevel() {
		const levelQuestions = this.questions.filter(pregunta => pregunta.categoryLevel === this.preguntaLevel)
		return levelQuestions
	}

	/**
	 * 
	 * @param {string} preguntaId 
	 */
	setPregunta(preguntaId){
		console.log('preguntaId: ' + preguntaId)
		const question = this.questions.find(pregunta => pregunta.id === preguntaId)
		this.pregunta = question
	}

	isEnded() {
		console.log('cant preguntas: ' + this.questions.length )
		console.log('pregunta level: ' + this.preguntaLevel)
		console.log(`finalizado: ${this.finalizado ? 'true' : 'false'}`)
		return this.preguntaLevel === 5 || this.finalizado
	}

	/**
	 * 
	 * @param {String} answer 
	 */
	guess(answer) {
		if (this.pregunta.correctAnswer(answer)) {
			console.log('correcto')
			this.puntuacion++
			this.preguntaLevel++
		} else 
			this.finalizado = true
	}
}

module.exports = Juego