//Local Components
import EventList from '../components/listing/EventList';
import Footer from '../components/footer/Footer';
import LandingNav from './../components/navbar/LandingNav';
import { createContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase-config';
import DBNav from '../components/navbar/DBNav';

function Landing() {
	const UserContext = createContext('');
	const [user] = useAuthState(auth);
	!user ? null : console.log(`UserUID:${user.uid}`);
	return (
		<UserContext.Provider value={!user ? null : user.uid}>
			<div className='landing'>
				<div className='landing-header'>
					<div className='landing-header-col1'>
						<h1>For better unity, help your community.</h1>
						<button
							onClick={() => document.getElementById('list')?.scrollIntoView()}>
							Find your next event
						</button>
					</div>
					<div className='landing-header-col2'>
						<img src='/assets/landing2-backdrop.png' alt='error' />
					</div>
				</div>
				<div className='landing-body'>
					<EventList use='dash' />
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
