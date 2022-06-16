import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function EventSuccess({ showModal, setShowModal, event, xp }: any) {
	const navigate = useNavigate();
	return (
		<motion.div
			initial={{ scale: 0, opacity: 0 }}
			animate={showModal ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
			transition={{
				scale: showModal ? { duration: 0.1 } : { delay: 0.5, duration: 0.1 },
				default: showModal ? { delay: 0.1, duration: 0.5, type: 'tween' } : { duration: 0.5, type: 'tween' },
			}}
			className='create-eventsuccess'>
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
				className='create-eventsuccess-container'>
				<div className='create-eventsuccess-container-row1'>
					<CloseIcon onClick={() => setShowModal(false)} className='create-eventsuccess-container-row1-icon' />
				</div>
				<div className='create-eventsuccess-container-row2'>
					<img src='../../../../assets/gift.png' className='create-eventsuccess-container-row2-icon' />
					<h1 className='create-eventsuccess-container-row2-text1'>You have successfully completed {event}.</h1>
					<h2 className='create-eventsuccess-container-row2-text2'>You gained +{xp} points</h2>
					<h2 className='create-eventsuccess-container-row2-text2'>See your dashboard for your certificates!</h2>
					<button onClick={() => navigate('/events')} className='create-eventsuccess-container-row2-button'>
						More Events
					</button>
				</div>
			</motion.div>
		</motion.div>
	);
}

export default EventSuccess;
