import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { auth, firestore } from '../../firebase-config';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import CloseIcon from '@mui/icons-material/Close';
import DataService from '../../firebase/services';
import EventSuccess from './EventSuccess';

function Code({ showModal, setShowModal }: any) {
	const [showSuccess, setShowSuccess] = useState(false);
	const [user, loading] = useAuthState(auth);
	const [eventList, setEventList] = useState([]);
	const [joinedEvents, setJoinedEvents] = useState([]);
	const [completedEvents, setCompletedEvents] = useState([]);
	const [code, setCode] = useState('');
	const [currentExp, setCurrentExp] = useState(0);

	useEffect(() => {
		user &&
			onSnapshot(collection(firestore, 'events'), (snapshot) => {
				setEventList(snapshot.docs.map((docEach) => docEach.data()));
			});
		user &&
			onSnapshot(query(collection(firestore, 'user'), where('email', '==', user.email)), (snapshot) => {
				setJoinedEvents(snapshot.docs.at(0).data().eventsJoined);
				setCompletedEvents(snapshot.docs.at(0).data().completedEvents);
				setCurrentExp(snapshot.docs.at(0).data().expTotal);
			});
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

				joinedEvents.forEach((data) => {
					//prevent repeat submission
					// console.log('data !== code', data, code);
					checkJoined = checkJoined && data !== code;
				});
				if (checkJoined) alert('You have not yet joined this event. Please join first.');
				if (check && checkJoined === false) {
					completed.push(code);
					newExp += event.expReward;
					setShowModal(false);
					// alert('Congratulations! You have completed the event and earned ' + event.expReward + ' EXP!');
				}
			}
		});

		check
			? await DataService.updateUser(
					{
						expTotal: newExp,
						eventsJoined: joined,
						completedEvents: completed,
					},
					user.uid,
			  ).then(() => setShowSuccess(true))
			: alert('Sorry. You already submitted this code.');
	};

	return (
		<>
			<EventSuccess
				showModal={showSuccess}
				setShowModal={setShowSuccess}
				event={eventList.at(eventList.findIndex((event) => event.eventCode === code))?.eventName}
				xp={eventList.at(eventList.findIndex((event) => event.eventCode === code))?.expReward}
			/>
			<motion.div
				initial={{
					scale: 0,
					opacity: 0,
				}}
				animate={showModal ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
				transition={
					showModal
						? {
								scale: { duration: 0.1, type: 'tween' },
								opacity: { delay: 0.1, duration: 0.3, type: 'tween' },
						  }
						: {
								scale: { delay: 0.6, duration: 0.1, type: 'tween' },
								opacity: { delay: 0.3, duration: 0.3, type: 'tween' },
						  }
				}
				className='code'>
				<motion.div
					initial={{
						scale: 0,
					}}
					animate={showModal ? { scale: 1 } : { scale: 0 }}
					transition={
						showModal
							? {
									scale: { delay: 0.3, duration: 0.3, type: 'tween' },
							  }
							: {
									scale: { duration: 0.2, type: 'tween' },
							  }
					}
					className='code-container'>
					<div className='code-container-top'>
						<h1>Finished a task or event?</h1>
						<div className='code-container-close'>
							<CloseIcon onClick={() => setShowModal(false)} className='code-container-close-icon' />
						</div>
					</div>

					<div className='code-container-center'>
						<img src='/assets/code-backdrop.png' alt='' />
						<h3>Enter your code</h3>
						<div className='code-container-center-row'>
							<input
								type='text'
								className='code-container-center-row-field'
								value={code}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCode(event.target.value)}
							/>
							<button type='submit' onClick={updateUserEvents}>
								Submit
							</button>
						</div>
					</div>
					<div className='rsvp-container-footer'>
						<h2>powered by </h2>
						<h1>AltruWiz</h1>
					</div>
				</motion.div>
			</motion.div>
		</>
	);
}

export default Code;
