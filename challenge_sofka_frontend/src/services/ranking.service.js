// const ENDPOINT = 'http://localhost:4000'
const ENDPOINT = 'https://sofka-challenge-backend.herokuapp.com'

export function ranking () {
	const data = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		}
	}
	return fetch(`${ENDPOINT}/api/juegos`, data)
		.then(res => { return res.json() })
		.then(res => { return res })
		.catch(err => { return err })
}