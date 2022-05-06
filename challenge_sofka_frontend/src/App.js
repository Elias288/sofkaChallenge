import { useState } from 'react'
import { Juego } from './pages'

function App() {
	const [jugar, setJugar] = useState(false)

	return (
		<div className="App">
			{!jugar && <button className='Inicio' onClick={() => setJugar(true)}>Jugar</button>}
			{ jugar && <Juego />}
		</div>
	)
}

export default App
