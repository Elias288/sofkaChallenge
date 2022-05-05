const ENDPOINT = 'http://localhost:4000'

export function juego () {
	return fetch(`${ENDPOINT}/api/juego/`, { method: 'POST' })
		.then(res => { return res.json() })
		.then(res => { return res })
		.catch(err => { return err })
}