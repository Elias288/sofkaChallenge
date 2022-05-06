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
				<div className="lista">
					<table>
						<tbody>
							{ rankings.map((ranking) => {
								return (
									<tr key={ranking._id}>
										<td>{ranking.nombreUsuario}</td>
										<td className='puntuacion'>{ranking.puntuacion}</td>
									</tr>
								)
							})}
						</tbody>
					</table>
				</div>
			)}
			{ rankings.length === 0 && <h3>loading...</h3>}
		</div>
	)
}

export default Ranking