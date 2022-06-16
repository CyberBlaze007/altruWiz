import { collection, onSnapshot } from 'firebase/firestore';
import { firestore } from '../../firebase-config';
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DBNav from './../navbar/DBNav';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import Footer from '../footer/Footer';
import { useNavigate } from 'react-router-dom';

function EventSearch() {
	const [eventList, setEventList] = useState([]);
	const [tempList, setTempList] = useState([]);
	const [search, setSearch] = useState('');
	const navigate = useNavigate();
	let searchTemp: string;

	const processDate = (data: any) => {
		const date = new Date(data.eventDate + 'T' + data.eventTime);
		const time = new Date(data.eventDate + 'T' + data.eventTime).toLocaleTimeString('en-US', {
			hour12: true,
			hour: 'numeric',
			minute: 'numeric',
		});
		return date.toDateString() + ' ' + time;
	};

	const getFiltered = () => {
		return search.length > 0
			? eventList.filter((data) => {
					return data.eventName.toLowerCase().includes(search.toLowerCase());
			  })
			: eventList;
	};

	useEffect(() => {
		onSnapshot(collection(firestore, 'events'), (snapshot) => {
			setEventList(snapshot.docs.map((docEach) => docEach.data()));
		});
	}, []);
	return (
		<div className='events-search'>
			<div className='events-search-navbar'>
				<DBNav />
			</div>
			<div className='events-search-body'>
				<div className='events-search-body-searchbar'>
					<ArrowBackIcon
						className='details-back-icon'
						onClick={() => {
							navigate('-1');
							window.scrollTo(0, 0);
						}}
					/>
					<TextField
						variant='outlined'
						color='secondary'
						size='small'
						className='events-search-body-searchbar-field'
						margin='dense'
						placeholder='Search Anything'
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => (searchTemp = event.target.value)}
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton edge='end' color='secondary' onClick={() => setSearch(searchTemp)}>
										<SearchIcon />
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
				</div>
				<div className='events-search-body-data'>
					{getFiltered().map((data) => {
						return (
							<div className='events-search-body-data-card'>
								<img className='events-search-body-data-card-image' src={data.eventImage}></img>
								<div className='events-search-body-data-card-details'>
									<h1 className='events-search-body-data-card-details-title'>{data.eventName}</h1>
									<h1 className='events-search-body-data-card-details-date'>{processDate(data)}</h1>
									<h1 className='events-search-body-data-card-details-org'>{data.eventCreator}</h1>
									<div className='events-search-body-data-card-details-xp'>
										<img src='/assets/xp-logo.svg' className='events-search-body-data-card-details-xp-icon' />
										<h1 className='events-search-body-data-card-details-xp-label'>{data.expReward} EXP</h1>
									</div>
									<p className='events-search-body-data-card-details-desc'>{data.eventDesc}</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<div className='events-search-footer'>
				<Footer />
			</div>
		</div>
	);
}

export default EventSearch;
