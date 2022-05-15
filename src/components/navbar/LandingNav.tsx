//Navigator Components
import { Link, useNavigate } from 'react-router-dom';

function LandingNav() {
	const navigate = useNavigate();
	return (
		<>
			<div className='nav'>
				<div className='nav-col1' onClick={() => navigate('/')}>
					<h1 className='nav-col1-text'>AltruWiz</h1>
					<img
						src='/assets/altruwiz-logo-colored.svg'
						className='nav-col1-icon'
					/>
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
