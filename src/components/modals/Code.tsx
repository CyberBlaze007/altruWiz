import { motion } from 'framer-motion';
import React from 'react';

function Code({ showModal, setShowModal }: any) {
	return (
		<motion.div
			initial={{
				opacity: 0,
				y: '-45vh',
				x: '30vw',
				scale: 0,
				borderRadius: '20px',
			}}
			animate={
				showModal
					? { opacity: 1, y: 0, x: 0, scale: 1, borderRadius: 0 }
					: {
							opacity: 0,
							y: '-45vh',
							x: '30vw',
							scale: 0,
							borderRadius: '20px',
					  }
			}
			transition={{ duration: 0.5, type: 'tween' }}
			className='code'
			onClick={() => {
				setShowModal(false);
			}}>
			eventcode
		</motion.div>
	);
}

export default Code;
