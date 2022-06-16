import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
function RankUp({ showModal, setShowModal, rank }: any) {
	const navigate = useNavigate();
	return (
		<motion.div
			initial={{ scale: 0, opacity: 0 }}
			animate={showModal ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
			transition={{
				scale: showModal ? { duration: 0.1 } : { delay: 0.5, duration: 0.1 },
				default: showModal ? { delay: 0.1, duration: 0.5, type: 'tween' } : { duration: 0.5, type: 'tween' },
			}}
			className='create-rankup'>
			<div className='create-rankup-void' onClick={() => setShowModal(close)} />
			<motion.div
				initial={{
					y: '100%',
				}}
				animate={
					showModal
						? { y: 0 }
						: {
								y: '100%',
						  }
				}
				transition={{ delay: 0.1, duration: 0.5, type: 'spring', stiffness: 200 }}
				className='create-rankup-container'>
				<img src='../../../../assets/rankup.png' className='create-rankup-container-icon' />
				<div className='create-rankup-container-text'>
					<h1 className='create-rankup-container-text-comp1'>Congratulations! You have been promoted to</h1>
					<h2 className='create-rankup-container-text-comp2'>{rank}</h2>
				</div>
				<button
					onClick={() => {
						navigate('/dashboard'), setShowModal(false);
					}}
					className='create-rankup-container-button'>
					View Dashboard
				</button>
			</motion.div>
		</motion.div>
	);
}

export default RankUp;
