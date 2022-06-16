import { motion } from 'framer-motion';
import DownloadIcon from '@mui/icons-material/Download';
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
			}>
			<motion.div
				initial={{
					scale: 0,
				}}
				animate={showModal ? { scale: 1 } : { scale: 0 }}
				transition={
					showModal
						? {
								scale: { delay: 0.3, duration: 0.5, type: 'tween' },
						  }
						: {
								scale: { duration: 0.3, type: 'tween' },
						  }
				}
				className='certificates-modal-container'>
				<Cert
					name={user}
					title={
						showModal
							? event.at(
									event.findIndex((data) => {
										return id === data.eventID;
									}),
							  ).eventName
							: ''
					}
					org={
						showModal
							? event.at(
									event.findIndex((data) => {
										return id === data.eventID;
									}),
							  ).eventCreator
							: ''
					}
					date={
						showModal
							? event.at(
									event.findIndex((data) => {
										return id === data.eventID;
									}),
							  ).eventDate
							: ''
					}
				/>
				<DownloadIcon />
			</motion.div>
		</motion.div>
	);
}

export default ModalCert;
