import React from 'react';
import Cert from './../cert/Cert';
import { personal_events } from './../../../assets/pseudodata/personal-events';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase-config';
import { profiles } from '../../../assets/pseudodata/profile-data';
import { motion } from 'framer-motion';

function Certificates() {
	const [user, loading] = useAuthState(auth);
	return (
		<div className='certificates'>
			{personal_events
				.filter((data) => data.status)
				.map((data) => (
					<motion.div
						whileHover={{
							y: '-0.6rem',
							boxShadow: '3px 4px 8px rgba(0, 0, 0, 0.05)',
						}}
						transition={{ duration: 0.2, type: 'tween' }}
						className='certificates-container'>
						<div className='certificates-container-image'>
							<Cert
								name={
									profiles.at(
										profiles.findIndex((data) => data.email === user.email)
									).name
								}
								title={data.title}
								org={data.org}
								date={data.date}
							/>
						</div>
						<div className='certificates-container-details'>
							<h1>{data.title}</h1>
							<h2>
								{data.date} {data.time}
							</h2>
							<h3>{data.org}</h3>
							<div className='certificates-container-details-xp'>
								<img src='/assets/xp-logo.svg' />
								<h3>{data.xp}</h3>
							</div>
							<p>{data.description}</p>
						</div>
					</motion.div>
				))}
		</div>
	);
}

export default Certificates;
