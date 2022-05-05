import React, { useState } from 'react';

//Icon Components
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

//Metadata
import { profiles } from './../../pseudodata/profile-data';

//Firebase Components
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { Link } from 'react-router-dom';

function DBNav() {
	const [profile, setProfile] = useState(true);

	const logout = async () => {
		try {
			await signOut(auth);
		} catch (error: any) {
			console.log(error.message);
		}
	};

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
				<nav className='nav-col2-p'>
					<div className='nav-col2-container'>
						<button className='nav-col2-container-button'>Event Code</button>
					</div>
					<div className='nav-col2-profile'>
						<Link onClick={logout} to={'/'}>
							<h1 className='nav-col2-profile-text'>
								{profiles.at(0).username}
							</h1>
						</Link>
						<div className='nav-col2-profile-nav'>
							{profile ? (
								<img
									src={`/src/pseudodata/${profiles.at(0).image}`}
									onError={() => setProfile(false)}
									className='nav-col2-profile-nav-pic'
								/>
							) : (
								<AccountCircleIcon className='nav-col2-profile-nav-pic' />
							)}
							<ArrowDropDownIcon className='nav-col2-profile-nav-menu' />
						</div>
					</div>
				</nav>
			</div>
		</>
	);
}

export default DBNav;
