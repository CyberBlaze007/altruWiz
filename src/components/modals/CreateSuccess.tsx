import React from 'react';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';

function CreateSuccess({ setShowCreate, showModal, setShowModal, eventCode }: any) {
	return (
		<motion.div
			initial={{ scale: 0, opacity: 0 }}
			animate={showModal ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
			transition={{
				scale: showModal ? { duration: 0.1 } : { delay: 0.5, duration: 0.1 },
				default: showModal ? { delay: 0.1, duration: 0.5, type: 'tween' } : { duration: 0.5, type: 'tween' },
			}}
			className='create-success'>
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
				className='create-success-container'>
				<div className='create-success-container-row1'>
					<CloseIcon onClick={() => setShowModal(false)} className='create-success-container-row1-icon' />
				</div>
				<div className='create-success-container-row2'>
					<img src='/assets/check-circle.svg' className='create-success-container-row2-icon' />
					<h1>You have successfully created an event.</h1>
					<h2>The event code is : {eventCode}</h2>
				</div>
				<div className='create-success-container-row3'>
					<button
						onClick={() => {
							setShowCreate(true);
							setShowModal(false);
						}}
						className='create-success-container-row3-button1'>
						Create Another Event
					</button>
					<button
						onClick={() => {
							navigator.clipboard.writeText(eventCode);
							alert(`Successfully Copied to Clipboard.\nEvent Code: ${eventCode}`);
							setShowModal(false);
						}}
						className='create-success-container-row3-button2'>
						Copy Event Code
					</button>
				</div>
			</motion.div>
		</motion.div>
	);
}

export default CreateSuccess;
