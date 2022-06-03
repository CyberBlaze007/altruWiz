import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { HashLoader } from 'react-spinners';
import { auth } from '../../firebase-config';

function Loading() {
	// const [user, loading] = useAuthState(auth);
	// const [time, setTime] = useState(true);
	// useEffect(() => {
	// 	if (loading) {
	// 		setTimeout(() => setTime(false), 3000);
	// 		return;
	// 	}
	// }, [user, loading]);
	// return (
	// 	<div
	// 		className={loading || time ? 'modal display-flex' : 'modal display-none'}
	// 	>
	// 		<section className='modal-main'>
	// 			<HashLoader size={100} color={'#9013FE'} />
	// 		</section>
	// 	</div>
	// );
}

export default Loading;
