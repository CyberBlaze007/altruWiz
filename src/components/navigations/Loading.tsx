import React, { useState } from 'react';
import { ScaleLoader } from 'react-spinners';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase-config';

function Loading() {
	const [time, setTime] = useState(true);
	const [user, loading] = useAuthState(auth);

	setTimeout(() => setTime(false), 1500);

	return (
		<div className={time ? 'modal display-flex' : 'modal display-none'}>
			<section className='modal-main'>
				<ScaleLoader height={'10rem'} width={'1.2rem'} color={'white'} />
			</section>
		</div>
	);
}

export default Loading;
