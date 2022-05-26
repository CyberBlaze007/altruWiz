import EventList from './../listing/EventList';
import { events } from '../../../assets/pseudodata/events-data';
import { personal_events } from '../../../assets/pseudodata/personal-events';
import { TextField } from '@mui/material';
import { useState } from 'react';

function Events() {
	const [search, setSearch] = useState('');
	return (
		<div className='event'>
			<div className='event-body'>
				<TextField
					variant='outlined'
					color='secondary'
					size='small'
					className='signin-body-container-col2-form-fields-field'
					margin='dense'
					placeholder='Search Anything'
					value={search}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
						setSearch(event.target.value)
					}
				/>
				{!search && (
					<>
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
					</>
				)}
				<EventList
					use='dash'
					head={
						events.filter((data) => {
							return data.title.toLowerCase().includes(search.toLowerCase());
						}).length > 0
							? 'Results found'
							: 'No results found'
					}
					events={
						search
							? events.filter((data) => {
									return data.title
										.toLowerCase()
										.includes(search.toLowerCase());
							  })
							: events
					}
				/>
			</div>
		</div>
	);
}

export default Events;
