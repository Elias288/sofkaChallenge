import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import './JuegoStyles.css'
import { quiz as quizService } from '../../services/quiz.service'
import { getPregunta as getPreguntaService } from '../../services/pregunta.service'
import { sendAnswer } from '../../services/sendAnswer'
import { Ranking } from '../../components'

const Juego = ({ username, setJugar }) => {
	const [pregunta, setPregunta] = useState({ pregunta: '', opciones: [], categoria: '', level: '' })
	const [mensaje, setMensaje] = useState({ msg: '', puntuacion: 0 })

	const initial = async () => {
		await quizService({ username })

		await getPreguntaService().then(res => {
			console.log(res)
			setPregunta({
				pregunta: res.pregunta.text,
				opciones: res.pregunta.choices,
				categoria: res.pregunta.category,
				level: res.pregunta.categoryLevel
			})
			setMensaje({ msg:'', puntuacion: res.puntuacion })
		})
	}
	useEffect(() => {
		initial()
	}, [])
	
	const onSubmit = async (e) => {
		e.preventDefault()
		await sendAnswer({ respuesta: e.target.textContent })

		await getPreguntaService().then(res => {
			console.log(res)
			if (!res.msg){
				setPregunta({
					pregunta: res.pregunta.text,
					opciones: res.pregunta.choices,
					categoria: res.pregunta.category,
					level: res.pregunta.categoryLevel
				})
				setMensaje({ msg:'', puntuacion: res.puntuacion })
			} else {
				setMensaje({ msg: res.msg, puntuacion: res.puntuacion })
			}
		})
	}

	return (
		<div className='juego'>
			{ !pregunta.opciones.length > 0 && <h3>Loading...</h3> }
			{ pregunta.opciones.length > 0 && mensaje.msg == '' && (<>
				<form>
					<h1>{pregunta.pregunta}</h1>
					
					<h2>Ronda: <strong>{pregunta.level} / 5</strong></h2>
					
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
				<p>{ pregunta.level !== 5 ? 'Puntaje X 2' : 'Puntaje X 3' }</p>
			</> )}
			{ mensaje.msg === '' && (<div className='score'>
				<p>Puntuació: <strong>{ mensaje.puntuacion }</strong></p>
			</div>) }
			{ mensaje.msg != '' && (<>
				<div className='Mensaje'>
					<h1>{mensaje.msg}</h1>
					<h3>Puntuacion: {mensaje.puntuacion}</h3>
					<button onClick={setJugar}>Volver</button>
				</div>
				<Ranking />
			</>) }
		</div>
	)
}
Juego.propTypes = {
	username: PropTypes.string.isRequired,
	setJugar: PropTypes.func
}

export default Juego