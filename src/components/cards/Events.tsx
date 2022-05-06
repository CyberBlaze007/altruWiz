import EventList from './../listing/EventList';
import Footer from './../footer/Footer';

function Events({ use }: any) {
	return (
		<div className='event'>
			<div className='event-body'>
				<EventList use={use} />
			</div>
			<div className='event-footer'>
				<Footer />
			</div>
		</div>
	);
}

export default Events;
