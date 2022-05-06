//@ts-check
// eslint-disable-next-line no-unused-vars
const Pregunta = require('./Pregunta')

class Quiz {
	puntuacion = 0
	preguntaLevel = 1
	finalizado = false
	pregunta = null

	/**
   *
   * @param {Pregunta[]} questions
   * @param {String} username
   */
	constructor(questions, username) {
		this.questions = questions
		this.userName = username
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

	isEnded() {
		return this.preguntaLevel === 6 ? 1 : 0 || this.finalizado ? 2: 0
	}

	/**
	 * 
	 * @param {String} answer 
	 */
	guess(answer) {
		if (this.pregunta.correctAnswer(answer)) {
			this.puntuacion === 0 ? this.puntuacion++ : this.puntuacion = this.puntuacion*2
			if (this.preguntaLevel === 5) {
				this.puntuacion = this.puntuacion *3
			}
			this.preguntaLevel++
		} else 
			this.finalizado = true
	}
}

module.exports = Quiz