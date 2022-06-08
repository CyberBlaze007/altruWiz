import { events } from '../../assets/pseudodata/events-data';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DBNav from './../components/navbar/DBNav';
import { useNavigate, useParams } from 'react-router-dom';
import Rsvp from '../components/modals/Rsvp';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase-config';
import DataService from '../firebase/services';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

function Details() {
	let { id } = useParams();
	const [showRsvp, setShowRsvp] = useState(false);
	const [myEvents, setMyEvents] = useState([]);
	const [user, loading] = useAuthState(auth);
	const [eventsJoined, setEventsJoined] = useState([]);
	// const [eventList, setEventList] = useState([]);
	const [data, setData] = useState(null);

	useEffect(() => {
		onSnapshot(
			query(collection(firestore, 'events'), where('eventID', '==', id)),
			(snapshot) => {
				setData(snapshot.docs.at(0).data());
			}
		);
		console.log('data: ', data);
		showRsvp
			? (document.querySelector('body').style.overflow = 'hidden')
			: (document.querySelector('body').style.overflow = 'auto');
		getMyEvents();
	}, [showRsvp, loading]);

	// const data = eventList.at(
	// 	eventList.findIndex((event) => {
	// 		// console.log(parseInt(id));
	// 		console.log(event.eventID);
	// 		console.log(id);
	// 		return event.eventID === id; //:rj:
	// 	})
	// );

	const getMyEvents = async () => {
		await DataService.getUser(user.uid).then((docSnap: any) => {
			if (docSnap.exists()) {
				setMyEvents(docSnap.data().eventsJoined);
			}
		});
	};
	const navigate = useNavigate();
	return (
		<>
			<Rsvp
				event={data}
				showModal={showRsvp}
				setShowModal={setShowRsvp}
				user={user}
				myEvents={eventsJoined}
			/>
			<div className='details'>
				<div className='details-nav'>
					<DBNav />
				</div>
				<div className='details-back'>
					<ArrowBackIcon
						className='details-back-icon'
						onClick={() => {
							navigate(-1);
						}}
					/>
				</div>
				<div className='details-head'>
					<div className='details-head-row1'>
						<div className='details-head-row1-col1'>
							<img src={data?.eventImage} alt={data?.eventName} />
						</div>
						<div className='details-head-row1-col2'>
							<h1 className='details-head-row1-col2-title'>
								{data?.eventName}
							</h1>
							<h1 className='details-head-row1-col2-org'>
								by {data?.eventCreator}
							</h1>
							<div className='details-head-row1-col2-xp'>
								<img src='/assets/pseudodata/images/star.png' alt='Star Icon' />
								<p>{data?.expReward}</p>
							</div>
						</div>
					</div>
					<div className='details-head-row2'>
						<ShareOutlinedIcon className='details-head-row2-icon' />
						<button
							onClick={() => {
								setEventsJoined([...myEvents, data?.eventCode]);
								setShowRsvp(true);
							}}
							className='details-head-row2-register'
						>
							Register
						</button>
					</div>
				</div>
				<div className='details-body'>
					<div className='details-body-col1'>
						<div className='details-body-col1-sec1'>
							<h1>Date and time</h1>
							<p>{data?.eventDate}</p>
							<p>{data?.eventTime}</p>
						</div>
						<div className='details-body-col1-sec2'>
							<h1>Location</h1>
							<p>{data?.location}</p>
						</div>
						<div className='details-body-col1-sec3'>
							<h1>Quests</h1>
							{data?.quests.map((element: any) => (
								<p key={data?.quests.indexOf(element)}>{element}</p>
							))}
						</div>
						{/* <div className='details-body-col1-sec4'>
							<h1>Available Badges</h1>
							{data?.badges.map((element:any) => (
								<p key={data?.badges.indexOf(element)}>{element}</p>
							))}
						</div> */}
					</div>
					<div className='details-body-col2'>
						<div className='details-body-col2-header'>
							<h1>About this event</h1>
						</div>
						<div className='details-body-col2-body'>
							<div className='details-body-col2-body-sec1'>
								<p>{data?.eventDesc}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Details;
