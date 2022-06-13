import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import {
	EmailShareButton,
	EmailIcon,
	FacebookShareButton,
	FacebookIcon,
	LineShareButton,
	LineIcon,
	LinkedinShareButton,
	LinkedinIcon,
} from 'react-share';

function Share({ url, eventName, eventDesc, showModal, setShowModal }: any) {
	let quote = `You are invited to join ${eventName} - ${eventDesc}`;
	return (
		<motion.div
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
			}
			className='share'
		>
			<div className='share-container'>
				<div className='share-container-top'>
					<h2>Share To:</h2>
					<CloseIcon
						className='share-container-top-close'
						onClick={() => setShowModal(false)}
					/>
				</div>
				<div className='share-container-icons'>
					<FacebookShareButton url={url} quote={eventName} hashtag={eventName}>
						<FacebookIcon size={40} round={true} />
					</FacebookShareButton>
					<LinkedinShareButton url={url} title={eventName} summary={quote}>
						<LinkedinIcon size={40} round={true} />
					</LinkedinShareButton>
					<LineShareButton url={url} title={eventName}>
						<LineIcon size={40} round={true} />
					</LineShareButton>

					<EmailShareButton url={url} subject={eventName} body={quote}>
						<EmailIcon size={40} round={true} />
					</EmailShareButton>
				</div>
			</div>
		</motion.div>
	);
}

export default Share;
