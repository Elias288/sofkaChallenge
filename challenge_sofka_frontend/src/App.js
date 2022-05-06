import { useState } from 'react'
import { Juego } from './pages'
import { Ranking } from './components'

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
			{!jugar && (
				<div className='inicio'>
					<form onSubmit={onSubmit}>
						<input
							type='text'
							placeholder='Nombre de Usuario'
							onChange={(e) => setUserName(e.target.value)}
						/>
						<button className='BtnInicio'>Jugar</button>
					</form>
					<Ranking />
				</div>
			)}
			{ jugar && <Juego username={userName} setJugar={jugarToggle} /> }
		</div>
	)
}

export default App
