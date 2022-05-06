import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import './JuegoStyles.css'
import { quiz as quizService } from '../../services/quiz.service'
import { getPregunta as getPreguntaService } from '../../services/pregunta.service'
import { sendAnswer } from '../../services/sendAnswer'
import { Ranking } from '../../components'

const Juego = ({ username }) => {
	const [pregunta, setPregunta] = useState({ pregunta: '', opciones: [], categoria: '', level: '' })
	const [mensaje, setMensaje] = useState({ msg: '', puntuacion: 0 })

	const initial = async () => {
		await quizService({ username })

		await getPreguntaService().then(res => {
			// console.log(res)
			setPregunta({
				pregunta: res.text,
				opciones: res.choices,
				categoria: res.category,
				level: res.categoryLevel
			})
		})
	}
	useEffect(() => {
		initial()
	}, [])
	
	const onSubmit = async (e) => {
		e.preventDefault()
		await sendAnswer({ respuesta: e.target.textContent })

		await getPreguntaService().then(res => {
			if (!res.msg){
				setPregunta({
					pregunta: res.text,
					opciones: res.choices,
					categoria: res.category,
					level: res.categoryLevel
				})
			} else {
				setMensaje({ msg: res.msg, puntuacion: res.puntuacion })
			}
		})
	}

	return (
		<div className='juego'>
			{!pregunta && <h3>Loading</h3>}
			{pregunta && mensaje.msg == '' && (
				<>
					<form>
						<h1>{pregunta.pregunta}</h1>
					
						<h2>Nivel: <strong>{pregunta.level} / 5</strong></h2>
					
						<h3>Categoria: <strong>{pregunta.categoria}</strong></h3>
					
						<div className='botonera'>
							{pregunta.opciones && pregunta.opciones.map((op, key) => {
								return (
									<button onClick={onSubmit} key={key}>
										{op}
									</button>
								)
							})}
						</div>
					</form>
					<p>{pregunta.level !== 5 ? 'Puntaje X 2' : 'Puntaje X 3'}</p>
				</>
			)}
			{mensaje.msg != '' && (
				<>
					<h1>{mensaje.msg}</h1>
					<h3>Puntuacion: {mensaje.puntuacion}</h3>
					<Ranking />
				</>
			)}
		</div>
	)
}
Juego.propTypes = {
	username: PropTypes.string.isRequired
}

export default Juego