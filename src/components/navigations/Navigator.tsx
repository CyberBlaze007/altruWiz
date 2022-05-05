import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../../firebase-config';
import { ScaleLoader } from 'react-spinners';

function Navigator() {
	const navigate = useNavigate();
	const location = useLocation();
	console.log(location);
	const [user, loading] = useAuthState(auth);
	const [time, setTime] = useState(true);

	useEffect(() => {
		if (loading) {
			setTimeout(() => setTime(false), 2000);
			return;
		}
		if (
			!user &&
			location.pathname !== '/' &&
			location.pathname !== '/login' &&
			location.pathname !== '/register'
		) {
			console.log(user);
			alert('Login First');
			navigate('/login');
		}
	}, [user, loading, location]);

	return (
		<div
			className={loading || time ? 'modal display-flex' : 'modal display-none'}>
			<section className='modal-main'>
				<ScaleLoader height={'10rem'} width={'1.2rem'} color={'white'} />
			</section>
		</div>
	);
}

export default Navigator;
