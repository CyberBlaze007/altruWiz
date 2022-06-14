import { Navigate, Outlet } from 'react-router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase-config';
import { useEffect } from 'react';
import Loading from './Loading';

const ProtectedRoutes = () => {
	const [user, loading] = useAuthState(auth);
	useEffect(() => {}, [loading]);
	return loading ? <Loading /> : user ? <Outlet /> : <Navigate to='/login' />;
};
export default ProtectedRoutes;
