import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function JoinedEvent({ showModal, setShowModal, event }: any) {
	const navigate = useNavigate();
	return (
		<motion.div
			initial={{ scale: 0, opacity: 0 }}
			animate={showModal ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
			transition={{
				scale: showModal ? { duration: 0.1 } : { delay: 0.5, duration: 0.1 },
				default: showModal ? { delay: 0.1, duration: 0.5, type: 'tween' } : { duration: 0.5, type: 'tween' },
			}}
			className='joined'>
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
				className='joined-container'>
				<div className='joined-container-row1'>
					<CloseIcon onClick={() => setShowModal(false)} className='joined-container-row1-icon' />
				</div>
				<div className='joined-container-row2'>
					<img src='/assets/user-check.png' className='joined-container-row2-icon' />
					<h1>You have successfully joined {event}!</h1>
					<button
						onClick={() => {
							navigate('/events');
						}}
						className='joined-container-row2-button'>
						More Events
					</button>
				</div>
			</motion.div>
		</motion.div>
	);
}

export default JoinedEvent;
