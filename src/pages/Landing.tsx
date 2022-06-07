//Local Components
import EventList from '../components/listing/EventList';
import Footer from '../components/footer/Footer';
import LandingNav from './../components/navbar/LandingNav';
import { createContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase-config';
import { collection, onSnapshot } from 'firebase/firestore';
import DBNav from '../components/navbar/DBNav';
function Landing() {
	const UserContext = createContext('');
	const [user, loading] = useAuthState(auth);
	const [eventList, setEventList] = useState([]);

	useEffect(() => {
		onSnapshot(collection(firestore, 'events'), (snapshot) => {
			setEventList(snapshot.docs.map((docEach) => docEach.data()));
		});
	}, [loading]);
	return (
		<UserContext.Provider value={!user ? null : user.uid}>
			<div className='landing'>
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
		</UserContext.Provider>
	);
}

export default Landing;
