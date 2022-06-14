//React Router Components
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//Local Components
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Details from './pages/Details';
import OrgDashboard from './pages/OrgDashboard';
import BeOrganizer from './pages/BeOrganizer';
// import EventCreation from './pages/EventCreation';
import Create from './pages/Create';
import ResetPass from './pages/ResetPass';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase-config';
import { createContext } from 'react';
import ReRoute from './components/navigations/ReRoute';
import ProtectedRoutes from './components/navigations/ProtectedRoutes';

export const UserContext = createContext(null);

function App() {
	const [user] = useAuthState(auth);

	return (
		<UserContext.Provider value={user}>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Landing />} />
					<Route path='/login' element={<Signin />} />
					<Route path='/register' element={<Signup />} />
					<Route path='/resetpassword' element={<ResetPass />} />
					<Route element={<ProtectedRoutes />}>
						<Route path='/event/:id' element={<Details />} />
						<Route path='/organizer' element={<OrgDashboard />} />
						<Route path='/organizer/:id' element={<BeOrganizer />} />
						<Route path='/dashboard' element={<Dashboard />} />
						<Route path='/dashboard/:id' element={<Dashboard />} />
						<Route path='/create' element={<Create />} />
					</Route>
					<Route path='/*' element={<ReRoute />} />
				</Routes>
			</BrowserRouter>
		</UserContext.Provider>
	);
}

export default App;
