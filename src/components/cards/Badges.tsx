import { ConstructionOutlined } from '@mui/icons-material';
import React from 'react';
import { badges } from '../../../assets/pseudodata/badges';

function Badges() {
	return (
		<div className='badges'>
			<div className='badges-list'>
				{badges.map((data) => (
					<div key={data.id} className='badges-list-card'>
						<div className='badges-list-card-overlay'>
							<img src={data.image} />
							<div className='badges-list-card-overlay-details'>
								<h1 className='badges-list-card-overlay-details-name'>
									{data.name}
								</h1>
								<h1 className='badges-list-card-overlay-details-desc'>
									{data.desc}
								</h1>
								<div className='badges-list-card-overlay-details-date'>
									<h1 className='badges-list-card-overlay-details-date-text1'>
										{data.date}
									</h1>
									<h1 className='badges-list-card-overlay-details-date-text2'>
										DATE ACQUIRED
									</h1>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Badges;
