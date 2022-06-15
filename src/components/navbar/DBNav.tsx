import { useState, useEffect, useContext } from 'react';

//Icon Components
import { Button } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import JoinInnerIcon from '@mui/icons-material/JoinInner';
import LogoutIcon from '@mui/icons-material/Logout';

//Firebase Components
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';
import DataService from '../../firebase/services';
import Code from '../modals/Code';
import { UserContext } from './../../App';
import { motion } from 'framer-motion';

function DBNav() {
	const [profile, setProfile] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();
	const user = useContext(UserContext);
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
						<motion.h1 whileTap={{ y: '2px' }} className='nav-col2-profile-text' onClick={() => navigate('/dashboard')}>
							{userName}
						</motion.h1>
						<div className='nav-col2-profile-nav'>
							{profile ? (
								<img
									src={userAvatar}
									onError={() => setProfile(false)}
									className='nav-col2-profile-nav-pic'
									onClick={() => setDropdownState(!dropDownState)}
								/>
							) : (
								<AccountCircleIcon className='nav-col2-profile-nav-pic' onClick={() => setDropdownState(!dropDownState)} />
							)}
							<motion.div animate={dropDownState ? { rotate: '-180deg' } : { rotate: 0 }} transition={{ duration: 0.5, type: 'spring' }}>
								<ArrowDropDownIcon className='nav-col2-profile-nav-menu' onClick={() => setDropdownState(!dropDownState)} />
							</motion.div>
							<motion.div
								initial={{
									y: '-100%',
									zIndex: -1,
									scale: 0,
									opacity: 0,
								}}
								animate={dropDownState ? { y: 0, zIndex: 1, opacity: 1, scale: 1 } : { y: '-100%', zIndex: -1, opacity: 0, scale: 0 }}
								className='nav-col2-profile-nav-modal-open'>
								<Button
									startIcon={<JoinInnerIcon />}
									onClick={() => {
										orgName ? navigate('/organizer') : navigate('/organizer/makeorg');
										setDropdownState(false);
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
							</motion.div>
						</div>
					</div>
				</nav>
			</div>
		</>
	);
}

export default DBNav;
