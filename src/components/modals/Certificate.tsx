import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cert from '../cert/Cert';

function ModalCert({ showModal, setShowModal, user, event }: any) {
	const navigate = useNavigate();
	const { id } = useParams();
	return (
		<motion.div
			className='certificates-modal'
			onClick={() => {
				setShowModal(false), navigate(-1);
			}}
			initial={{
				scale: 0,
				backgroundColor: 'none',
			}}
			animate={
				showModal
					? { backgroundColor: 'rgba(64, 31, 97, 0.3)', scale: 1 }
					: { backgroundColor: 'none', scale: 0 }
			}
			transition={
				showModal
					? {
							scale: { duration: 0.5, type: 'tween' },
							backgroundColor: { delay: 0.3, duration: 0.3, type: 'tween' },
					  }
					: {
							scale: { delay: 0.3, duration: 0.3, type: 'tween' },
							backgroundColor: { duration: 0.3, type: 'tween' },
					  }
			}
		>
			<div className='certificates-modal-container'>
				<Cert
					name={user}
					title={
						showModal
							? event.at(
									event.findIndex((data) => {
										return id === data.eventID;
									})
							  ).eventName
							: ''
					}
					org={
						showModal
							? event.at(
									event.findIndex((data) => {
										return id === data.eventID;
									})
							  ).eventCreator
							: ''
					}
					date={
						showModal
							? event.at(
									event.findIndex((data) => {
										return id === data.eventID;
									})
							  ).eventDate
							: ''
					}
				/>
			</div>
		</motion.div>
	);
}

export default ModalCert;
