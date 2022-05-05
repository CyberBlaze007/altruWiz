import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../../firebase-config';

function Navigator() {
	const navigate = useNavigate();
	const location = useLocation();
	console.log(location);
	const [user, loading] = useAuthState(auth);

	useEffect(() => {
		if (loading) {
			alert('loading.......');
			return;
		}
		if (
			!user &&
			location.pathname !== '/' &&
			location.pathname !== '/login' &&
			location.pathname !== '/register'
		) {
			console.log(user);
			// alert('Login First');
			navigate('/login');
		}
	}, [user, location]);
	return <></>;
}

export default Navigator;
