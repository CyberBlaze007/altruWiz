import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function EventList({ use, head, events }: any) {
	const [isEnough, setIsEnough] = useState(events.length > 8);
	const [isCompact, setIsCompact] = useState(isEnough);
	const navigate = useNavigate();

	useEffect(() => {
		setIsEnough(events.length > 8);
		return () => setIsEnough(events.length > 8);
	}, [events]);

	return (
		<div className='events' id={use}>
			<div className='events-header'>
				<h1>{head}</h1>
			</div>
			<div className='events-list'>
				<div className={`events-list${isCompact ? '-compact' : '-expanded'}`}>
					{isCompact
						? events.slice(0, 8).map((data: any) => (
								<div
									key={data.id}
									className='events-list-items'
									onClick={() => navigate('/event/details')}>
									<img src={`/assets/pseudodata/${data.thumbnail}`}></img>
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
						: events.map((data: any) => (
								<div
									key={data.id}
									className='events-list-items'
									onClick={() => navigate('/event/details')}>
									<img src={`/assets/pseudodata/${data.thumbnail}`}></img>
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

			{isEnough ? (
				<div className='events-container'>
					<button
						className='events-container-button'
						onClick={() => setIsCompact(!isCompact)}>
						{isCompact ? 'See More' : 'See Less'}
					</button>
				</div>
			) : null}
		</div>
	);
}

export default EventList;
