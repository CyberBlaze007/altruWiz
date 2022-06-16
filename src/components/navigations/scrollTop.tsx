import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollTop = (props: any) => {
	const location = useLocation();
	useEffect(() => {
		setTimeout(() => {
			const div = document.querySelector('#locator');
			div?.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
				inline: 'nearest',
			});
		}, 0);
	}, [location]);
	return <>{props.children}</>;
};

export default ScrollTop;
