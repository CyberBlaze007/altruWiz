import React, { useState } from 'react';
import { HashLoader } from 'react-spinners';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase-config';

function Loading() {
	const [time, setTime] = useState(true);
	const [user, loading] = useAuthState(auth);

	setTimeout(() => setTime(false), 3000);

	return (
		<div className={time ? 'modal display-flex' : 'modal display-none'}>
			<section className='modal-main'>
				<HashLoader size={100} color={'#9013FE'} />
			</section>
		</div>
	);
}

export default Loading;
