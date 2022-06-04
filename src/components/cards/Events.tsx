import EventList from './../listing/EventList';
import { events } from '../../../assets/pseudodata/events-data';
import { personal_events } from '../../../assets/pseudodata/personal-events';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

function Events() {
	const [search, setSearch] = useState('');
	let searchTemp: string;
	return (
		<div className='event'>
			<div className='event-body'>
				<div className='event-body-searchbar'>
					<TextField
						variant='outlined'
						color='secondary'
						size='small'
						className='event-body-searchbar-field'
						margin='dense'
						placeholder='Search Anything'
						value={searchTemp}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
							(searchTemp = event.target.value)
						}
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton edge='end' color='secondary'>
										<SearchIcon
											onClick={() => setSearch(searchTemp || search)}
										/>
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
				</div>

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
