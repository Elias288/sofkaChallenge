const ENDPOINT = 'http://localhost:4000'

export function sendAnswer ({ respuesta }) {
	const data = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ respuesta })
	}
	return fetch(`${ENDPOINT}/api/juego/answer`, data)
		.then(res => { return res.json() })
		.then(res => { return res })
		.catch(err => { return err })
}