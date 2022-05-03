//Navigator Components
import { Link } from 'react-router-dom';

function LandingNav() {
	return (
		<>
			<div className='nav'>
				<div className='nav-col1'>
					<h1 className='nav-col1-text'>AltruWiz</h1>
					<img src='/assets/altruwiz-logo-colored.svg' className='nav-col1-icon' />
				</div>
				<nav className='nav-col2'>
					<Link to='/login' className='nav-col2-link'>
						Log In
					</Link>
					<Link to='/register' className='nav-col2-link'>
						Sign Up
					</Link>
				</nav>
			</div>
		</>
	);
}

export default LandingNav;
