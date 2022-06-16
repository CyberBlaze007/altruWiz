import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DBNav from './../components/navbar/DBNav';
import { useNavigate, useParams } from 'react-router-dom';
import Rsvp from '../components/modals/Rsvp';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase-config';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import Footer from './../components/footer/Footer';
import Share from './../components/modals/Share';
import ScrollTop from './../components/navigations/scrollTop';

function Details() {
	let { id } = useParams();
	const [showRsvp, setShowRsvp] = useState(false);
	const [showShare, setShowShare] = useState(false);
	const [shareUrl, setShareUrl] = useState('');
	const [orgDesc, setOrgDesc] = useState('');
	const [eventCreator, setEventCreator] = useState('');
	const [creatorEmail, setCreatorEmail] = useState('');
	const [myEvents, setMyEvents] = useState([]);
	const [user, loading] = useAuthState(auth);
	const [eventsJoined, setEventsJoined] = useState([]);
	const [data, setData] = useState(null);

	useEffect(() => {
		user &&
			onSnapshot(query(collection(firestore, 'events'), where('eventID', '==', id)), (snapshot) => {
				setData(snapshot.docs.at(0).data());
				setEventCreator(snapshot.docs.at(0).data().eventCreator);
			});

		user && showRsvp ? (document.querySelector('body').style.overflow = 'hidden') : (document.querySelector('body').style.overflow = 'auto');
		user &&
			onSnapshot(query(collection(firestore, 'user'), where('email', '==', user.email)), (snapshot) => {
				setMyEvents(snapshot.docs.at(0).data().eventsJoined);
			});
		eventCreator &&
			onSnapshot(query(collection(firestore, 'organizations'), where('orgName', '==', eventCreator)), (snapshot) => {
				setCreatorEmail(snapshot.docs.at(0).data().creator);
				setOrgDesc(snapshot.docs.at(0).data().orgAbout);
			});
	}, [showRsvp, loading, eventCreator]);
	const processDate = (data: any) => {
		const date = new Date(data?.eventDate + 'T' + data?.eventTime);

		return date.toDateString();
	};
	const processTime = (data: any) => {
		const time = new Date(data?.eventDate + 'T' + data?.eventTime).toLocaleTimeString('en-US', {
			hour12: true,
			hour: 'numeric',
			minute: 'numeric',
		});
		return time;
	};
	const navigate = useNavigate();
	return (
		<ScrollTop>
			<div id='locator' />
			<Rsvp event={data} showModal={showRsvp} setShowModal={setShowRsvp} user={user} myEvents={eventsJoined} creator={creatorEmail} />
			<div className='details'>
				<div className='details-nav'>
					<DBNav />
				</div>
				<div className='details-back'>
					<ArrowBackIcon
						className='details-back-icon'
						onClick={() => {
							navigate('-1');
							window.scrollTo(0, 0);
						}}
					/>
				</div>
				<div className='details-head'>
					<div className='details-head-row1'>
						<div className='details-head-row1-col1'>
							<img src={data?.eventImage} alt={data?.eventName} />
						</div>
						<div className='details-head-row1-col2'>
							<h1 className='details-head-row1-col2-title'>{data?.eventName}</h1>
							<h1 className='details-head-row1-col2-org'>by {data?.eventCreator}</h1>
							<div className='details-head-row1-col2-xp'>
								<img src='/assets/pseudodata/images/star.png' alt='Star Icon' />
								<p>{data?.expReward}</p>
							</div>
						</div>
					</div>
					<div className='details-head-row2'>
						<ShareOutlinedIcon
							className='details-head-row2-icon'
							onClick={() => {
								setShareUrl(`altruwiz.web.app/event/${id}`);
								setShowShare(true);
							}}
						/>
						{showShare && (
							<Share url={shareUrl} eventName={data?.eventName} eventDesc={data?.eventDesc} showModal={showShare} setShowModal={setShowShare} />
						)}
						{myEvents.includes(data?.eventCode) ? (
							<button className='details-head-row2-register'>Participated</button>
						) : data?.attendCount >= data?.membersAllowed ? (
							<button className='details-head-row2-register'>Max capacity reached</button>
						) : (
							<button
								onClick={() => {
									setEventsJoined([...myEvents, data?.eventCode]);
									setShowRsvp(true);
								}}
								className='details-head-row2-register'>
								Register
							</button>
						)}
					</div>
				</div>
				<div className='details-body'>
					<div className='details-body-col1'>
						<div className='details-body-col1-sec1'>
							<h1>Date and time</h1>
							<p>{processDate(data)}</p>
							<p>{processTime(data)}</p>
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
					</div>
					<div className='details-body-col2'>
						<div className='details-body-col2-header'>
							<h1>About Organizer</h1>
						</div>
						<div className='details-body-col2-body'>
							<div className='details-body-col2-body-sec1'>
								<p>{orgDesc}</p>
							</div>
						</div>
						<div className='details-body-col2-divider' />
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
			<Footer />
		</ScrollTop>
	);
}

export default Details;
