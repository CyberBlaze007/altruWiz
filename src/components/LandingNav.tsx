import React from 'react';

function LandingNav() {
	return (
		<>
			<div className='nav'>
				<div className='nav-col1'>
					<h1 className='nav-col1-text'>AltruWiz</h1>
					<img
						src='/assets/altruwiz-logo-colored.svg'
						className='nav-col1-icon'
					/>
				</div>
				<div className='nav-col2'>
					<a>Log In</a>
					<a>Sign Up</a>
				</div>
			</div>
		</>
	);
}

export default LandingNav;
