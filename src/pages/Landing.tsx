//Local Components
import EventList from '../components/listing/EventList';
import Footer from '../components/footer/Footer';
import LandingNav from './../components/navbar/LandingNav';
import { useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase-config';
import { collection, onSnapshot } from 'firebase/firestore';
import DBNav from '../components/navbar/DBNav';
import ScrollTop from './../components/navigations/scrollTop';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
function Landing() {
	const user = useContext(UserContext);
	const [eventList, setEventList] = useState([]);

	useEffect(() => {
		onSnapshot(collection(firestore, 'events'), (snapshot) => {
			setEventList(snapshot.docs.map((docEach) => docEach.data()));
		});
	}, []);
	return (
		<ScrollTop>
			<div className='landing'>
				<div id='locator' />
				<div className='landing-header'>
					<div className='landing-header-col1'>
						<h1>For better unity, help your community.</h1>
						<button
							onClick={() => document.getElementById('list')?.scrollIntoView()}
						>
							Find your next event
						</button>
					</div>
					<div className='landing-header-col2'>
						<img src='/assets/landing2-backdrop.png' alt='error' />
					</div>
				</div>
				<div className='landing-body'>
					<EventList use='list' head='All Events' events={eventList} />
					<div className='landing-body-footer'>
						<Footer />
					</div>
				</div>
				<div className='landing-navbar'>
					{user ? <DBNav /> : <LandingNav />}
				</div>
			</div>
		</ScrollTop>
	);
}

export default Landing;
