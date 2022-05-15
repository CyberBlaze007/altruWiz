//Navigator Components
import { Link, useNavigate } from 'react-router-dom';

function AuthNav() {
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
			</div>
		</>
	);
}

export default AuthNav;
