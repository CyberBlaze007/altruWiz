import React, { useState } from 'react';
import { events } from '../../pseudodata/events-data';

function EventList({ use }: any) {
	const [isCompact, setIsCompact] = useState(true);

	return (
		<div className='events'>
			<div className='events-header'>
				<h1>Events</h1>
			</div>
			<div className='events-list' id={use}>
				<div className={`events-list${isCompact ? '-compact' : '-expanded'}`}>
					{isCompact
						? events.slice(0, 8).map((data) => (
								<div key={data.id} className='events-list-items'>
									<img src={`/src/pseudodata/${data.thumbnail}`}></img>
									<div className='events-list-items-details'>
										<h1 className='events-list-items-details-title'>
											{data.title}
										</h1>
										<h1 className='events-list-items-details-date'>
											{data.date}
										</h1>
										<h1 className='events-list-items-details-org'>
											{data.org}
										</h1>
										<div className='events-list-items-details-xp'>
											<img
												src='/assets/xp-logo.svg'
												className='events-list-items-details-xp-icon'></img>
											<h1 className='events-list-items-details-xp-label'>
												{data.xp}
											</h1>
										</div>
									</div>
								</div>
						  ))
						: events.map((data) => (
								<div key={data.id} className='events-list-items'>
									<img src={`/src/pseudodata/${data.thumbnail}`}></img>
									<div className='events-list-items-details'>
										<h1 className='events-list-items-details-title'>
											{data.title}
										</h1>
										<h1 className='events-list-items-details-date'>
											{data.date}
										</h1>
										<h1 className='events-list-items-details-org'>
											{data.org}
										</h1>
										<div className='events-list-items-details-xp'>
											<img
												src='/assets/xp-logo.svg'
												className='events-list-items-details-xp-icon'></img>
											<h1 className='events-list-items-details-xp-label'>
												{data.xp}
											</h1>
										</div>
									</div>
								</div>
						  ))}
				</div>
			</div>

			<div className='events-container'>
				<button
					className='events-container-button'
					onClick={() => setIsCompact(!isCompact)}>
					{isCompact ? 'See More' : 'See Less'}
				</button>
			</div>
		</div>
	);
}

export default EventList;
