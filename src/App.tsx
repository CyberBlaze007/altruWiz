//React Router Components
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//Local Components
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Details from './pages/Details';
import BeOrganizer from './pages/BeOrganizer';
// import EventCreation from './pages/EventCreation';
import Create from './components/modals/Create';
import ResetPass from './pages/ResetPass';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase-config';
import { createContext } from 'react';
import ReRoute from './components/navigations/ReRoute';
import ProtectedRoutes from './components/navigations/ProtectedRoutes';
import OrgDash from './pages/OrgDash';
import ScrollTop from './components/navigations/scrollTop';
import EventSuccess from './components/modals/EventSuccess';
import CreateSuccess from './components/modals/CreateSuccess';
import RankUp from './components/modals/RankUp';
import JoinedEvent from './components/modals/JoinedEvent';
import NewBadge from './components/modals/NewBadge';
import VerifyEmail from './pages/VerifyEmail';
import EventSearch from './components/listing/EventSearch';

export const UserContext = createContext(null);

function App() {
	const [user] = useAuthState(auth);

	return (
		<UserContext.Provider value={user}>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Landing />} />
					<Route path='/test' element={<EventSuccess />} />
					<Route path='/test3' element={<RankUp />} />
					<Route path='/test5' element={<NewBadge />} />
					<Route path='/login' element={<Signin />} />
					<Route path='/verify' element={<VerifyEmail />} />
					<Route path='/register' element={<Signup />} />
					<Route path='/resetpassword' element={<ResetPass />} />
					<Route element={<ProtectedRoutes />}>
						<Route path='/event/:id' element={<Details />} />
						<Route path='/organizer' element={<OrgDash />} />
						<Route path='/events' element={<EventSearch />} />
						<Route path='/organizer/:id' element={<BeOrganizer />} />
						<Route path='/dashboard' element={<Dashboard />} />
						<Route path='/dashboard/:id' element={<Dashboard />} />
					</Route>
					<Route path='/*' element={<ReRoute />} />
				</Routes>
			</BrowserRouter>
		</UserContext.Provider>
	);
}

export default App;
