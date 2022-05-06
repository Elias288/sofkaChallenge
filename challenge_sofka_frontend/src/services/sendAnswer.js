// const ENDPOINT = 'http://localhost:4000'
const ENDPOINT = 'https://sofka-challenge-backend.herokuapp.com'

export function sendAnswer ({ respuesta }) {
	const data = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ respuesta })
	}
	return fetch(`${ENDPOINT}/api/quiz/answer`, data)
		.then(res => { return res.json() })
		.then(res => { return res })
		.catch(err => { return err })
}