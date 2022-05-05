import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		const div = document.querySelector('html');
		div.scrollTo(0, 0);
	}, [pathname]);
	return <></>;
}

export default ScrollToTop;
