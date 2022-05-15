import EventList from './../listing/EventList';
import Footer from './../footer/Footer';

function Events() {
	return (
		<div className='event'>
			<div className='event-body'>
				<EventList use='dash' />
			</div>
		</div>
	);
}

export default Events;
