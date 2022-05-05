const ENDPOINT = 'http://localhost:4000'

export function getPregunta () {
	return fetch(`${ENDPOINT}/api/juego/`, { method: 'GET' })
		.then(res => { return res.json() })
		.then(res => { return res })
		.catch(err => { return err })
}