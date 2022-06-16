import { motion } from 'framer-motion';
import { saveAs } from 'file-saver';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import { useNavigate, useParams } from 'react-router-dom';
import Cert from '../cert/Cert';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function ModalCert({ showModal, setShowModal, user, event }: any) {
	const navigate = useNavigate();
	const { id } = useParams();

	const handleSave = () => {
		html2canvas(document.querySelector('#toSave')).then((canvas) => {
			canvas.toBlob((blob) => {
				saveAs(blob, `${user}.jpg`);
			});
		});
	};

	const handlePdf = () => {
		html2canvas(document.querySelector('#toSave')).then((canvas) => {
			var myImage = canvas.toDataURL('image/jpeg,1.0');
			// Adjust width and height
			var imgWidth = 280;
			var imgHeight = 200;
			// jspdf changes
			var pdf = new jsPDF('l', 'mm', 'a4');
			pdf.addImage(myImage, 'jpeg', 8.5, 5, imgWidth, imgHeight); // 2: 19
			pdf.save(`${user}.pdf`);
		});
	};

	return (
		<motion.div
			className='certificates-modal'
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
			<div
				onClick={() => {
					setShowModal(false), navigate(-1);
				}}
				className='certificates-modal-void'
			/>
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
				<div id='toSave' className='certificates-modal-container-cert'>
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
				</div>

				<div className='certificates-modal-container-downloads'>
					<motion.div whileHover={{ y: '-2px' }} whileTap={{ y: '2px' }} onClick={handlePdf} className='certificates-modal-container-downloads-icon'>
						<PictureAsPdfOutlinedIcon className='certificates-modal-container-downloads-icon-comp' />
					</motion.div>
					<motion.div whileHover={{ y: '-2px' }} whileTap={{ y: '2px' }} onClick={handleSave} className='certificates-modal-container-downloads-icon'>
						<DownloadIcon className='certificates-modal-container-downloads-icon-comp' />
					</motion.div>
				</div>
			</motion.div>
		</motion.div>
	);
}

export default ModalCert;
