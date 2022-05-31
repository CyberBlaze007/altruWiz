import React from 'react';
import DBNav from '../components/navbar/DBNav';

function EventCreation() {
	return (
		<>
			<div>
				<DBNav />
				<div>
					<h1>Make an Event</h1>
					<p>Let’s cover some basic information about your event.</p>
				</div>
				<div>
					<div>
						<div>
							{/* <img src='' alt='Name Icon' /> */}
							<h2>Name of the Event</h2>
							<input type='text' />
							{/* <img src='' alt='Time Icon' /> */}
							<h2>Time {`&`} Date</h2>
							<input type='datetime-local' />
						</div>

						{/* <img src='' alt='Image Icon' /> */}
						<h2>Event Image</h2>
						<input type='file' />
					</div>

					{/* <img src='' alt='Location Icon' /> */}
					<h2>Location</h2>
					<input type='search' placeholder='Search a venue' />

					{/* <img src='' alt='Quest Icon' /> */}
					<h2>Quest</h2>
					<input type='checkbox' placeholder='Add a field' />

					{/* <img src='' alt='Desc Icon' /> */}
					<h2>Description</h2>
					<textarea />
				</div>
				<button>Done</button>
			</div>
		</>
	);
}

export default EventCreation;
