import { motion } from 'framer-motion';
import React from 'react';

function Code({ showModal, setShowModal }: any) {
	return (
		<motion.div
			initial={{ opacity: 0, y: '100%' }}
			animate={showModal ? { opacity: 1, y: 0 } : { opacity: 0, y: '100%' }}
			transition={{ delay: 0.3, duration: 0.5, type: 'tween' }}
			className='code'
			onClick={() => {
				setShowModal(false);
			}}>
			eventcode
		</motion.div>
	);
}

export default Code;
