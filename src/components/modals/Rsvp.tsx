import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';
import DataService from '../../firebase/services';

function Rsvp({ event, showModal, setShowModal, user, myEvents }: any) {
	const participateEvent = async (eventsJoined: any) => {
		await DataService.updateUser(
			{
				eventsJoined: eventsJoined,
			},
			user.uid
		);
	};

	return (
		<motion.div
			initial={{ scale: 0, opacity: 0 }}
			animate={showModal ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
			transition={{
				scale: showModal ? { duration: 0.1 } : { delay: 0.5, duration: 0.1 },
				default: showModal
					? { delay: 0.1, duration: 0.5, type: 'tween' }
					: { duration: 0.5, type: 'tween' },
			}}
			className='rsvp'
		>
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
				className='rsvp-container'
			>
				<div className='rsvp-container-close'>
					<CloseIcon
						onClick={() => setShowModal(false)}
						className='rsvp-container-close-icon'
					/>
				</div>
				<div className='rsvp-container-header'>
					<div className='rsvp-container-header-texts'>
						<div className='rsvp-container-header-texts-title'>
							<h1>{event.title}</h1>
						</div>
						<div className='rsvp-container-header-texts-desc'>
							<h2>organized by</h2>
							<h1>{event.org}</h1>
						</div>
					</div>
				</div>
				<div className='rsvp-container-body'>
					<div className='rsvp-container-body-col1'>
						<img src={`/assets/pseudodata/${event.thumbnail}`} />
						<div className='rsvp-container-body-col1-desc'>
							<p>{event.description}</p>
						</div>
					</div>
					<div className='rsvp-container-body-col2'>
						<button
							className='rsvp-container-body-col2-btn1'
							onClick={() => {
								participateEvent(myEvents);
								setShowModal(false);
							}}
						>
							Participate
						</button>
						<button className='rsvp-container-body-col2-btn2'>
							Contact Organizer
						</button>
					</div>
				</div>
				<div className='rsvp-container-footer'>
					<h2>powered by </h2>
					<h1>AltruWiz</h1>
				</div>
			</motion.div>
		</motion.div>
	);
}

export default Rsvp;
