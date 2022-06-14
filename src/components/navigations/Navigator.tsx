import { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';

function Navigator() {
	const location = useLocation();
	const navigate = useNavigate();
	const [time, setTime] = useState(true);

	useEffect(() => {
		setTimeout(() => setTime(false), 3000);
		if (location.pathname != '/login') navigate('/login');
		window.scrollTo(0, 0);
	}, [location]);

	return (
		<div className={time ? 'modal display-flex' : 'modal display-none'}>
			<section className='modal-main'>
				<HashLoader size={100} color={'#9013FE'} />
			</section>
		</div>
	);
}

export default Navigator;
