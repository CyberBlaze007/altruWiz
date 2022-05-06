import React from 'react';
import EventList from './../listing/EventList';
import Footer from './../footer/Footer';

function Events() {
	return (
		<div className='event'>
			<div className='event-body'>
				<EventList />
			</div>
			<div className='event-footer'>
				<Footer />
			</div>
		</div>
	);
}

export default Events;
