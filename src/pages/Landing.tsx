import { useEffect, useState } from 'react';
import LandingNav from '../components/LandingNav';
import '../main.scss';

function Landing() {
	const [offsetY, setOffset] = useState(0);
	const handleScroll = () => setOffset(window.pageYOffset);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<div className='landing'>
			<div className='landing-header'>
				<div className='landing-header-col1'>
					<h1>For better unity, help your community.</h1>
					<button onClick={() => console.log('clicked')}>
						Find your next event
					</button>
				</div>
				<div className='landing-header-col2'>
					<img src='/assets/landing2-backdrop.png' alt='error' />
				</div>
			</div>
			<div className='landing-body'>
				<h1>Events</h1>
			</div>
			<div className='landing-navbar'>
				<LandingNav />
			</div>
		</div>
	);
}

export default Landing;
