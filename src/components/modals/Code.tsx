import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { auth, firestore } from '../../firebase-config';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { TextField } from '@mui/material';
import DataService from '../../firebase/services';

function Code({ showModal, setShowModal }: any) {
	const [user, loading] = useAuthState(auth);
	const [eventList, setEventList] = useState([]);
	const [joinedEvents, setJoinedEvents] = useState([]);
	const [completedEvents, setCompletedEvents] = useState([]);
	const [code, setCode] = useState('');
	const [currentExp, setCurrentExp] = useState(0);

	useEffect(() => {
		onSnapshot(collection(firestore, 'events'), (snapshot) => {
			setEventList(snapshot.docs.map((docEach) => docEach.data()));
		});
		onSnapshot(
			query(collection(firestore, 'user'), where('email', '==', user.email)),
			(snapshot) => {
				setJoinedEvents(snapshot.docs.at(0).data().eventsJoined);
				setCompletedEvents(snapshot.docs.at(0).data().completedEvents);
				setCurrentExp(snapshot.docs.at(0).data().expTotal);
			}
		);
	}, [loading]);

	const updateUserEvents = async () => {
		let check = true;
		let checkJoined = true;
		let joined = joinedEvents;
		let completed = completedEvents;
		let newExp = currentExp;
		eventList.forEach((event) => {
			//Check if code is found in events
			if (event.eventCode === code) {
				completedEvents.forEach((data) => {
					//prevent repeat submission
					// console.log('data !== code', data, code);
					check = check && data !== code;
				});
				completed.push(code);
				newExp += event.expReward;

				joinedEvents.forEach((data) => {
					//prevent repeat submission
					// console.log('data !== code', data, code);
					checkJoined = checkJoined && data !== code;
				});
				joined.push(code);
			}
		});

		check
			? await DataService.updateUser(
					{
						expTotal: newExp,
						eventsJoined: joined,
						completedEvents: completed,
					},
					user.uid
			  )
			: alert('You already submitted this code');
	};
	//after entering event code
	// 	if (expCurrent >= expReq) {
	// 		let newExp = expCurrent - expReq;
	// 		let newRank = '';
	// 		switch (expReq) {
	// 			case 1000: {
	// 				newRank = 'Growing Ember';
	// 				break;
	// 			}
	// 			case 5000: {
	// 				newRank = 'Waking Essence';
	// 				break;
	// 			}
	// 			case 10000: {
	// 				newRank = 'Kindled Soul';
	// 				break;
	// 			}
	// 			case 20000: {
	// 				newRank = 'Manifested Spirit';
	// 				break;
	// 			}
	// 			case 50000: {
	// 				newRank = 'Profound Mind';
	// 				break;
	// 			}
	// 			case 100000: {
	// 				newRank = 'Zealot Body';
	// 				break;
	// 			}
	// 			case 250000: {
	// 				newRank = 'Altruist Sage';
	// 				break;
	// 			}
	// 			case 500000: {
	// 				newRank = 'Proxima Singula';
	// 				break;
	// 			}
	// 		}
	// 		await DataService.updateUser(
	// 			{
	// 				expTotal: newExp,
	// 				rank: newRank,
	// 			},
	// 			user.uid
	// 		).then(() => console.log('update successful'));
	// 	}
	// });
	return (
		<motion.div
			initial={{
				opacity: 0,
				y: '-45vh',
				x: '30vw',
				scale: 0,
				borderRadius: '20px',
			}}
			animate={
				showModal
					? { opacity: 1, y: 0, x: 0, scale: 1, borderRadius: 0 }
					: {
							opacity: 0,
							y: '-45vh',
							x: '30vw',
							scale: 0,
							borderRadius: '20px',
					  }
			}
			transition={{ duration: 0.5, type: 'tween' }}
			className='code'
		>
			<div>
				<TextField
					color='secondary'
					size='small'
					className='profile-body-sec1-form-lname-field'
					margin='dense'
					value={code}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
						setCode(event.target.value)
					}
					fullWidth
				/>
				<button
					type='reset'
					onClick={() => {
						setShowModal(false);
					}}
				>
					Close
				</button>
				<button type='submit' onClick={updateUserEvents}>
					Submit Code
				</button>
			</div>
		</motion.div>
	);
}

export default Code;
