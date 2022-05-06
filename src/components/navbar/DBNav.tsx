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
import UserDataService from '../../firebase/services';
import { useAuthState } from 'react-firebase-hooks/auth';

function DBNav() {
	const [profile, setProfile] = useState(true);
	const [user] = useAuthState(auth);
	// const docUser = UserDataService.getUser(user.uid);

	const logout = async () => {
		try {
			await signOut(auth);
		} catch (error: any) {
			console.log(error.message);
		}
	};
	// const getCurrentUser = async () => {
	// 	try {
	// 		await UserDataService.getUser(user.uid).then((doc) => {
	// 			console.log(doc.data());
	// 		});
	// 	} catch (error: any) {
	// 		console.log(error.message);
	// 	}
	// };
	const deleteU = async () => {
		try {
			await UserDataService.deleteUser(user.uid);
		} catch (error: any) {
			console.log(error.message);
		}
	};

	return (
		<>
			<div className='nav'>
				<div className='nav-col1'>
					<h1 className='nav-col1-text'>AltruWiz</h1>
					{/* <Link onClick={getCurrentUser} to={'/dashboard'}> */}
					<img
						src='/assets/altruwiz-logo-colored.svg'
						className='nav-col1-icon'
					/>
					{/* </Link> */}
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
							<Link onClick={deleteU} to={'/'}>
								<ArrowDropDownIcon className='nav-col2-profile-nav-menu' />
							</Link>
						</div>
					</div>
				</nav>
			</div>
		</>
	);
}

export default DBNav;
