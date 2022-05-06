import React, { useEffect, useState } from 'react'

import './RankingStyle.css'
import { ranking } from '../../services/ranking.service'

const Ranking = () => {
	const [rankings, setRanking] = useState([])

	useEffect(() => {
		setTimeout(() => 
			ranking().then(res => {
				setRanking(res)
			}), 1500
		)
	}, [])
	
	return (
		<div className='Ranking'>
			<div className="title">
				<h3>Ranking</h3>
			</div>
			{ rankings.length > 0 && (
				<ul>
					{
						rankings.map((ranking) => {
							return (
								<li key={ranking._id}>
									{ranking.nombreUsuario} - {ranking.puntuacion}
								</li>
							)
						})
					}
				</ul>
			)}
			{ rankings.length === 0 && <p>loading...</p>}
		</div>
	)
}

export default Ranking