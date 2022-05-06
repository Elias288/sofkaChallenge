import React, { useState } from 'react'
import { Juego } from './pages'
import { Ranking } from './components'
import logoSofka from './img/logoSofkau.png'

function App() {
	const [jugar, setJugar] = useState(false)
	const [userName, setUserName] = useState('')

	const jugarToggle = () => {
		setJugar(!jugar)
	}

	const onSubmit = (e) => {
		e.preventDefault()
		jugarToggle()
	}

	return (
		<div className="App">
			{!jugar && (<div className='inicio'>
				<div className='title'>
					<h1>SofkaU Challenge</h1>
					<h2>Juego de preguntas</h2>
					<img src={logoSofka} />
				</div>
				<form onSubmit={onSubmit}>
					<input
						type='text'
						placeholder='Nombre de Usuario'
						onChange={(e) => setUserName(e.target.value)}
					/>
					<button className='BtnInicio'>Jugar</button>
				</form>
				<div className='Instrucciones'>
					<h3>Instrucciones</h3>
					<p>El juego consiste en elegir la respuesta correcta a la pregunta presentada, al contestar erronamente el juego termina sino pasa al siguiente nivel.</p>
					<br />
					<p>Para iniciar el juego registra tu nombre y apreta el boton de iniciar para responder las preguntas presentadas. Al finalizar aparecera tu nombre y tu puntuacion en el ranking</p>
				</div>
				<Ranking />
			</div>)}
			{ jugar && <Juego username={userName} setJugar={jugarToggle} /> }
		</div>
	)
}

export default App
