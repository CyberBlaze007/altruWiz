import React, { useState, useEffect } from 'react';

//Icon Components
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

//Metadata
import { profiles } from './../../pseudodata/profile-data';

//Firebase Components
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { Link } from 'react-router-dom';
import DataService from '../../firebase/services';
import { useAuthState } from 'react-firebase-hooks/auth';

function DBNav() {
	const [profile, setProfile] = useState(true);
	const [user] = useAuthState(auth);
	// const docUser = UserDataService.getUser(user.uid);
	// useEffect(() => {
	// 	getCurrentUser();
	// }, []);
	const logout = async () => {
		try {
			await signOut(auth);
		} catch (error: any) {
			console.log(error.message);
		}
	};
	// const getCurrentUser = async () => {
	// 	const data = await DataService.getUser(user.uid);
	// 	console.log(data.data());
	// .then((docSnap) => {
	// 	console.log(user.uid);
	// 	if (docSnap.exists()) {
	// 		console.log('Document data:', docSnap.data());
	// 	} else {
	// 		// doc.data() will be undefined in this case
	// 		console.log('No such document!');
	// 	}
	// });
	// };
	const deleteU = async () => {
		try {
			await DataService.deleteUser(user.uid);
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
