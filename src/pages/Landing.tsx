//Local Components
import EventList from '../components/listing/EventList';
import Footer from '../components/footer/Footer';
import LandingNav from './../components/navbar/LandingNav';

function Landing() {
	return (
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
				<EventList />
				<div className='landing-body-footer'>
					<Footer />
				</div>
			</div>
			<div className='landing-navbar'>
				<LandingNav />
			</div>
		</div>
	);
}

export default Landing;
