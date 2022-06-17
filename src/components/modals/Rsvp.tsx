import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';
import { useState } from 'react';
import DataService from '../../firebase/services';
import JoinedEvent from './JoinedEvent';
import emailjs from '@emailjs/browser';

function Rsvp({ event, showModal, setShowModal, user, myEvents, creator}: any) {
	const [showSuccess, setShowSuccess] = useState(false);
	const serviceId = 'service_uudw07o';
	const templateId = 'template_xp295v9';
	const userId = 'user_tTVTjivQHURFBCECQLga4';

	const updateEvent = async (id: any, numAttendees: any) => {
		let newAttendCount = numAttendees + 1;
		await DataService.updateEvent(
			{
				attendCount: newAttendCount,
			},
			id,
		);
	};
	const participateEvent = async (eventsJoined: any) => {
		await DataService.updateUser(
			{
				eventsJoined: eventsJoined,
			},
			user.uid,
		).then(() => setShowSuccess(true));
	};

	//using template: Event Registration Success in EmailJS
	const emailConfirmation = (
		eventName: string, 
		eventDate: any,
		eventTime: any,
		eventExp: number,
		email: string,
		) => {
		let template_params = {
			event_joined: eventName,
			event_date: eventDate,
			user_email: email,
			event_time: eventTime,
			event_exp: eventExp
		}
		emailjs.send(serviceId, templateId, template_params, userId);
		{console.log('Success! Email Registration Sent!')}
	}

	return (
		<>
			<JoinedEvent showModal={showSuccess} setShowModal={setShowSuccess} event={event?.eventName} />
			<motion.div
				initial={{ scale: 0, opacity: 0 }}
				animate={showModal ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
				transition={{
					scale: showModal ? { duration: 0.1 } : { delay: 0.5, duration: 0.1 },
					default: showModal ? { delay: 0.1, duration: 0.5, type: 'tween' } : { duration: 0.5, type: 'tween' },
				}}
				className='rsvp'>
				<motion.div
					initial={{
						y: '100%',
						scale: 0,
					}}
					animate={
						showModal
							? { y: 0, x: 0, scale: 1 }
							: {
									y: '100%',
									scale: 0,
							  }
					}
					transition={{ delay: 0.1, duration: 0.5, type: 'tween' }}
					className='rsvp-container'>
					<div className='rsvp-container-close'>
						<CloseIcon onClick={() => setShowModal(false)} className='rsvp-container-close-icon' />
					</div>
					<div className='rsvp-container-header'>
						<div className='rsvp-container-header-texts'>
							<div className='rsvp-container-header-texts-title'>
								<h1>{event?.eventName}</h1>
							</div>
							<div className='rsvp-container-header-texts-desc'>
								<h2>organized by</h2>
								<h1>{event?.eventCreator}</h1>
							</div>
						</div>
					</div>
					<div className='rsvp-container-body'>
						<div className='rsvp-container-body-col1'>
							<img src={event?.eventImage} />
							<div className='rsvp-container-body-col1-desc'>
								<p>{event?.eventDesc}</p>
							</div>
						</div>
						<div className='rsvp-container-body-col2'>
							<button
								className='rsvp-container-body-col2-btn1'
								onClick={() => {
									updateEvent(event?.eventCode, event?.attendCount);
									emailConfirmation(
										event?.eventName,
										event?.eventDate,
										event?.eventTime,
										event?.expReward,
										user?.email,
									);
									participateEvent(myEvents);
									setShowModal(false);
								}}>
								Participate
							</button>
							<a href={`mailto:${creator}`} className='rsvp-container-body-col2-btn2'>
								Contact Organizer
							</a>
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

export default Rsvp;
