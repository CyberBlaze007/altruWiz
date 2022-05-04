import React, { useState } from 'react';

//Icon Components
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

//Metadata
import { profiles } from './../../pseudodata/profile-data';

function DBNav() {
	const [profile, setProfile] = useState(true);
	return (
		<>
			<div className='nav-p'>
				<div className='nav-p-col1'>
					<h1 className='nav-p-col1-text'>AltruWiz</h1>
					<img
						src='/assets/altruwiz-logo-colored.svg'
						className='nav-p-col1-icon'
					/>
				</div>
				<nav className='nav-p-col2'>
					<div className='nav-p-col2-container'>
						<button className='nav-p-col2-container-button'>Event Code</button>
					</div>
					<div className='nav-p-col2-profile'>
						<h1 className='nav-p-col2-profile-text'>
							{profiles.at(0).username}
						</h1>
						<div className='nav-p-col2-profile-nav'>
							{profile ? (
								<img
									src={`/src/pseudodata/${profiles.at(0).image}`}
									onError={() => setProfile(false)}
									className='nav-p-col2-profile-nav-pic'
								/>
							) : (
								<AccountCircleIcon className='nav-p-col2-profile-nav-pic' />
							)}
							<ArrowDropDownIcon className='nav-p-col2-profile-nav-menu' />
						</div>
					</div>
				</nav>
			</div>
		</>
	);
}

export default DBNav;
