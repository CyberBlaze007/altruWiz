import EventList from './../listing/EventList';
import { events } from '../../../assets/pseudodata/events-data';
import { personal_events } from '../../../assets/pseudodata/personal-events';

function Events() {
	return (
		<div className='event'>
			<div className='event-body'>
				<EventList
					use='dash'
					head='Joined Events'
					events={personal_events.filter((data) => {
						return !data.status;
					})}
				/>
				<EventList
					use='dash'
					head='Completed Events'
					events={personal_events.filter((data) => {
						return data.status;
					})}
				/>
				<EventList use='dash' head='Available Events' events={events} />
			</div>
		</div>
	);
}

export default Events;
