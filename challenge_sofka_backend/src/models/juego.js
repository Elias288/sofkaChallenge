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
	}
	/**
	 * 
	 * @returns {Pregunta[]} 
	 */
	getPreguntasLevel() {
		const levelQuestions = this.questions.filter(pregunta => pregunta.categoryLevel === this.preguntaLevel)
		return levelQuestions
	}

	isEnded() {
		return this.preguntaLevel === 6 || this.finalizado
	}

	/**
	 * 
	 * @param {String} answer 
	 */
	guess(answer) {
		if (this.pregunta.correctAnswer(answer)) {
			this.puntuacion++
			if (this.preguntaLevel === 5) {
				this.puntuacion = this.puntuacion + this.puntuacion
			}
			this.preguntaLevel++
		} else 
			this.finalizado = true
	}
}

module.exports = Juego