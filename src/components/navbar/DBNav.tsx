import React, { useState, useEffect, createContext } from 'react';

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
<<<<<<< Updated upstream
	const UserContext = createContext('');
=======
	var [userName, setUserName] = useState('');
>>>>>>> Stashed changes

	const logout = async () => {
		try {
			await signOut(auth);
		} catch (error: any) {
			console.log(error.message);
		}
	};
	const getCurrentUser = async () => {
		await DataService.getUser(user.uid).then((docSnap) => {
			// console.log(user.uid);
			if (docSnap.exists()) {
				// console.log('Document data:', docSnap.data());
				const myData = docSnap.data();
				setUserName(myData.name.first);
			} else {
				// doc.data() will be undefined in this case
				console.log('No such document!');
			}
		});
	};

	useEffect(() => {
		getCurrentUser();
	}, []);

	const deleteU = async () => {
		try {
			await DataService.deleteUser(user.uid);
		} catch (error: any) {
			console.log(error.message);
		}
	};

	return (
		<>
			<UserContext.Provider value={!user ? null : user.uid}>
				<div className='nav'>
					<div className='nav-col1'>
						<h1 className='nav-col1-text'>AltruWiz</h1>
						<img
							src='/assets/altruwiz-logo-colored.svg'
							className='nav-col1-icon'
						/>
					</div>
<<<<<<< Updated upstream
					<nav className='nav-col2-p'>
						<div className='nav-col2-container'>
							<button className='nav-col2-container-button'>Event Code</button>
						</div>
						<div className='nav-col2-profile'>
							<Link onClick={logout} to={'/'}>
								<h1 className='nav-col2-profile-text'>{userName}</h1>
=======
					<div className='nav-col2-profile'>
						<Link onClick={logout} to={'/'}>
							<h1 className='nav-col2-profile-text'>{userName}</h1>
						</Link>
						<div className='nav-col2-profile-nav'>
							{profile ? (
								<img
									src={`/src/pseudodata/${profiles.at(0).image}`}
									onError={() => setProfile(false)}
									onLoad={() => setProfile(true)}
									className='nav-col2-profile-nav-pic'
								/>
							) : (
								<AccountCircleIcon className='nav-col2-profile-nav-pic' />
							)}
							<Link onClick={deleteU} to={'/'}>
								<ArrowDropDownIcon className='nav-col2-profile-nav-menu' />
>>>>>>> Stashed changes
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
			</UserContext.Provider>
		</>
	);
}

export default DBNav;
