import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ReRoute() {
	const navigate = useNavigate();
	useEffect(() => {
		navigate('/');
	}, []);
	return <></>;
}

export default ReRoute;
