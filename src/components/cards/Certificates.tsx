import { useState, useEffect } from 'react';
import Cert from './../cert/Cert';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../../firebase-config';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ModalCert from '../modals/Certificate';

function Certificates() {
	const [user, loading] = useAuthState(auth);
	const [eventList, setEventList] = useState([]);
	const [completedEvents, setCompletedEvents] = useState([]);
	const [name, setName] = useState('');
	const navigate = useNavigate();
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		onSnapshot(collection(firestore, 'events'), (snapshot) => {
			setEventList(snapshot.docs.map((docEach) => docEach.data()));
		});
		onSnapshot(
			query(collection(firestore, 'user'), where('email', '==', user.email)),
			(snapshot) => {
				setCompletedEvents(snapshot.docs.at(0).data().completedEvents);
				setName(
					snapshot.docs.at(0).data().name.first +
						' ' +
						snapshot.docs.at(0).data().name.last
				);
			}
		);
	}, [loading]);
	const processDate = (data: any) => {
		const date = new Date(data.eventDate + 'T' + data.eventTime);
		const time = new Date(
			data.eventDate + 'T' + data.eventTime
		).toLocaleTimeString('en-US', {
			hour12: true,
			hour: 'numeric',
			minute: 'numeric',
		});
		return date.toDateString() + ' ' + time;
	};
	return (
		<>
			<ModalCert
				showModal={showModal}
				setShowModal={setShowModal}
				user={name}
				event={eventList.filter((eventData) => {
					let check = false;
					completedEvents.forEach((data) => {
						check = check || data === eventData.eventCode;
					});
					return check;
				})}
			/>

			<div className='certificates'>
				{eventList
					.filter((eventData) => {
						let check = false;
						completedEvents.forEach((data) => {
							check = check || data === eventData.eventCode;
						});
						return check;
					})
					.map((data) => (
						<motion.div
							key={data.eventID}
							onClick={() => {
								setShowModal(true);
								navigate(`${data.eventID}`);
							}}
							whileHover={{
								y: '-0.6rem',
								boxShadow: '3px 4px 8px rgba(0, 0, 0, 0.05)',
							}}
							transition={{ duration: 0.2, type: 'tween' }}
							className='certificates-container'
						>
							<div className='certificates-container-image'>
								<Cert
									name={name}
									title={data.eventName}
									org={data.eventCreator}
									date={data.eventDate}
								/>
							</div>
							<div className='certificates-container-details'>
								<h1>{data.eventName}</h1>
								<h2>{processDate(data)}</h2>
								<h3>{data.eventCreator}</h3>
								<div className='certificates-container-details-xp'>
									<img src='/assets/xp-logo.svg' />
									<h3>{data.expReward}</h3>
								</div>
								<p>{data.eventDesc}</p>
							</div>
						</motion.div>
					))}
			</div>
		</>
	);
}

export default Certificates;
