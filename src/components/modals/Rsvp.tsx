import React from 'react';

function Rsvp({ event }: any) {
	return (
		<div className='rsvp'>
			<div className='rsvp-header'>
				<div className='rsvp-header-texts'>
					<div className='rsvp-header-texts-title'>{event.title}</div>
					<div className='rsvp-header-texts-desc'>
						<h2>organized by</h2>
						<h1>{event.organizer}</h1>
					</div>
				</div>
				<div className='rsvp-header-back'></div>
			</div>
			<div className='rsvp-body'>
				<div className='rsvp-body-col1'>
					<img src={event.image} />
					<div className='rsvp-body-col1-desc'>
						<p>{event.description}</p>
					</div>
				</div>
				<div className='rsvp-body-col1'></div>
			</div>
			<div className='rsvp-footer'></div>
		</div>
	);
}

export default Rsvp;
