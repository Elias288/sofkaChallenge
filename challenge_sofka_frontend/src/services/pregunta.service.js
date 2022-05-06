// const ENDPOINT = 'http://localhost:4000'
const ENDPOINT = 'https://sofka-challenge-backend.herokuapp.com'

export function getPregunta () {
	return fetch(`${ENDPOINT}/api/quiz/`, { method: 'GET' })
		.then(res => { return res.json() })
		.then(res => { return res })
		.catch(err => { return err })
}