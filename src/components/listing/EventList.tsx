import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function EventList({ use, head, events }: any) {
	const [isEnough, setIsEnough] = useState(events.length > 8);
	const [isCompact, setIsCompact] = useState(isEnough);
	const navigate = useNavigate();

	const processDate = (data: any) => {
		const date = new Date(data.eventDate + 'T' + data.eventTime);
		const time = new Date(data.eventDate + 'T' + data.eventTime).toLocaleTimeString('en-US', {
			hour12: true,
			hour: 'numeric',
			minute: 'numeric',
		});
		return date.toDateString() + ' ' + time;
	};

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
								<div key={data.eventCode} className='events-list-items' onClick={() => navigate(`/event/${data.eventID}`)}>
									<img src={data.eventImage}></img>
									<div className='events-list-items-details'>
										<h1 className='events-list-items-details-title'>{data.eventName}</h1>
										<h1 className='events-list-items-details-date'>{processDate(data)}</h1>

										<h1 className='events-list-items-details-org'>{data.eventCreator}</h1>
										<div className='events-list-items-details-xp'>
											<img src='/assets/xp-logo.svg' className='events-list-items-details-xp-icon'></img>
											<h1 className='events-list-items-details-xp-label'>{data.expReward}</h1>
										</div>
									</div>
								</div>
						  ))
						: events.map((data: any) => (
								<div key={data.eventCode} className='events-list-items' onClick={() => navigate(`/event/${data.eventID}`)}>
									<div className='events-list-items-image'>
										<img src={data.eventImage} />
									</div>
									<div className='events-list-items-details'>
										<h1 className='events-list-items-details-title'>{data.eventName}</h1>
										<h1 className='events-list-items-details-date'>{processDate(data)}</h1>

										<h1 className='events-list-items-details-org'>{data.eventCreator}</h1>
										<div className='events-list-items-details-xp'>
											<img src='/assets/xp-logo.svg' className='events-list-items-details-xp-icon'></img>
											<h1 className='events-list-items-details-xp-label'>{data.expReward}</h1>
										</div>
									</div>
								</div>
						  ))}
				</div>
			</div>

			{isEnough ? (
				<div className='events-container'>
					<button className='events-container-button' onClick={() => setIsCompact(!isCompact)}>
						{isCompact ? 'See More' : 'See Less'}
					</button>
				</div>
			) : null}
		</div>
	);
}

export default EventList;
