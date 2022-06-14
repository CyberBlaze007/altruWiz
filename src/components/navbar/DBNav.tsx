import { useState, useEffect, createContext } from 'react';

//Icon Components
import { Button } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import JoinInnerIcon from '@mui/icons-material/JoinInner';
import LogoutIcon from '@mui/icons-material/Logout';

//Metadata
import { profiles } from '../../../assets/pseudodata/profile-data';

//Firebase Components
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';
import DataService from '../../firebase/services';
import Code from '../modals/Code';

function DBNav({ user }: any) {
	const [profile, setProfile] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();
	const [dropDownState, setDropdownState] = useState(false);
	var [userName, setUserName] = useState('');
	var [userAvatar, setUserAvatar] = useState('');
	var [orgName, setOrgName] = useState('');
	var [isOrganizer, setIsOrganizer] = useState(false);

	useEffect(() => {
		user && getCurrentUser();
	}, []);

	const logout = async () => {
		try {
			await signOut(auth).then(() => navigate('/'));
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
				setUserAvatar(myData.avatar);
				setProfile(true);
				setIsOrganizer(myData.isOrganizer);
			} else {
				// doc.data() will be undefined in this case
				console.log('No such document!');
			}
		});
		await DataService.getOrg(user.uid).then((docSnap) => {
			// console.log(user.uid);
			if (docSnap.exists()) {
				// console.log('Document data:', docSnap.data());
				const myData = docSnap.data();
				setOrgName(myData.orgName);
			} else {
				// doc.data() will be undefined in this case
				console.log('No such document!');
			}
		});
	};

	// const deleteU = async () => {
	// 	try {
	// 		await DataService.deleteUser(user.uid);
	// 	} catch (error: any) {
	// 		console.log(error.message);
	// 	}
	// };

	return (
		<>
			<Code showModal={showModal} setShowModal={setShowModal} />
			<div className='nav'>
				<div className='nav-col1' onClick={() => navigate('/')}>
					<h1 className='nav-col1-text'>AltruWiz</h1>
					<img src='/assets/altruwiz-logo-colored.svg' className='nav-col1-icon' />
				</div>
				<nav className='nav-col2-p'>
					<div className='nav-col2-container'>
						<button className='nav-col2-container-button' onClick={() => setShowModal(true)}>
							Event Code
						</button>
					</div>
					<div className='nav-col2-profile'>
						<h1 className='nav-col2-profile-text'>{userName}</h1>
						<div className='nav-col2-profile-nav'>
							{profile ? (
								<img src={userAvatar} onError={() => setProfile(false)} className='nav-col2-profile-nav-pic' />
							) : (
								<AccountCircleIcon className='nav-col2-profile-nav-pic' />
							)}
							<div onClick={() => setDropdownState(!dropDownState)}>
								<ArrowDropDownIcon className='nav-col2-profile-nav-menu' />
							</div>
							<div className={dropDownState ? 'nav-col2-profile-nav-modal-open' : 'nav-col2-profile-nav-modal-close'}>
								{dropDownState ? (
									<>
										<Button
											startIcon={<JoinInnerIcon />}
											onClick={() => {
												setDropdownState(false), orgName ? navigate('/organizer') : navigate('/organizer/makeorg');
											}}
											style={{
												color: 'white',
												textShadow: '0px 7px 8px rgba(0, 0, 0, 0.25)',
												fontFamily: 'Montserrat',
												fontStyle: 'normal',
												fontWeight: '500',
												fontSize: '0.8rem',
											}}>
											{' '}
											{isOrganizer ? orgName : 'Be an Organizer'}
										</Button>
										<Button
											startIcon={<LogoutIcon />}
											onClick={() => {
												setDropdownState(false), logout();
											}}
											style={{
												color: 'white',
												textShadow: '0px 7px 8px rgba(0, 0, 0, 0.25)',
												fontFamily: 'Montserrat',
												fontStyle: 'normal',
												fontWeight: '500',
												fontSize: '0.8rem',
											}}>
											{' '}
											Log-out
										</Button>
									</>
								) : null}
							</div>
						</div>
					</div>
				</nav>
			</div>
		</>
	);
}

export default DBNav;
