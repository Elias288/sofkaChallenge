const quizController = require('../controllers/quiz.controller')
const juegoRouter = require('express').Router()
const bodyParser = require('body-parser')

juegoRouter.use(bodyParser.urlencoded({ extended: true }))
juegoRouter.post('/answer',quizController.sendAnswer )
juegoRouter.post('/',quizController.createQuiz )
juegoRouter.get('/', quizController.getQuiz )

module.exports = juegoRouter
