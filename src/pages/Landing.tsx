import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import LandingNav from '../components/LandingNav';
import '../main.scss';

function Landing() {
	return (
		<div className='landing'>
			<div className='landing-header'>
				<div className='landing-header-col1'>
					<h1>For better unity, help your community.</h1>
					<button>Find your next event</button>
				</div>
				<div className='landing-header-col2'>
					<img src='/assets/landing2-backdrop.png' alt='error' />
				</div>
			</div>
			<Parallax pages={2} style={{ top: '0', left: '0' }}>
				<ParallaxLayer sticky={{ start: 0, end: 5 }}>
					<LandingNav />
				</ParallaxLayer>
				<ParallaxLayer
					offset={1}
					style={{
						width: '100vw',
						backgroundColor: 'white',
						boxShadow: '0 -3px 10px 5px rgba(0, 0, 0, 0.25)',
					}}
					className='landing-body'>
					<h1>Events</h1>
				</ParallaxLayer>
			</Parallax>
		</div>
	);
}

export default Landing;
